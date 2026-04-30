import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  COMMUNITY_POSTS_UPDATED,
  communityCategories,
  countComments,
  createCommunityPost,
  deleteCommunityPost,
  formatCommunityTime,
  getCommunityPosts,
  getStoredCommunityPosts,
  saveCommunityPosts,
  syncCommunityPost,
} from "../data/communityPosts.js";

const BRAND_COLOR = "#2F80ED";
const TEXT_DARK = "#0F172A";
const TEXT_MUTED = "#64748B";
const CARD_BORDER = "#E5EDF6";

const writableCategories = communityCategories.filter(
  (category) => category.id !== "all"
);

function CommunityPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const closingDetailRef = useRef(false);
  const [posts, setPosts] = useState([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [writeOpen, setWriteOpen] = useState(false);
  const [noticeOpen, setNoticeOpen] = useState(false);
  const [detailPost, setDetailPost] = useState(null);
  const [hoveredKey, setHoveredKey] = useState("");
  const [commentText, setCommentText] = useState("");
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [replyDrafts, setReplyDrafts] = useState({});
  const [editingComment, setEditingComment] = useState(null);
  const [editingImage, setEditingImage] = useState(null);
  const [editingPostId, setEditingPostId] = useState("");
  const [detailMenuOpen, setDetailMenuOpen] = useState(false);
  const [form, setForm] = useState({
    category: "reviews",
    title: "",
    content: "",
    images: [],
  });
  const selectedPostId = searchParams.get("post") || "";

  const loadLocalPosts = () => {
    setPosts(getStoredCommunityPosts());
  };

  const getCurrentUser = () => {
    try {
      const savedUser = window.localStorage.getItem("loginUser");
      const user = savedUser ? JSON.parse(savedUser) : null;
      const name =
        user?.nickname ||
        user?.name ||
        user?.username ||
        (user?.email ? user.email.split("@")[0] : "") ||
        "뚝딱 회원";

      return {
        id: user?.supabaseUserId || user?.id || "",
        name,
        role: String(user?.role || "").toLowerCase(),
        avatarUrl: user?.avatarUrl || "",
      };
    } catch {
      return { id: "", name: "뚝딱 회원", role: "", avatarUrl: "" };
    }
  };

  const currentUser = getCurrentUser();
  const canManageDetailPost =
    detailPost &&
    (currentUser.role === "admin" ||
      (detailPost.authorId &&
        currentUser.id &&
        String(detailPost.authorId) === String(currentUser.id)) ||
      (!detailPost.authorId &&
        detailPost.author &&
        currentUser.name &&
        String(detailPost.author) === String(currentUser.name)));

  const canManageAuthorContent = (item) =>
    currentUser.role === "admin" ||
    (item?.authorId &&
      currentUser.id &&
      String(item.authorId) === String(currentUser.id)) ||
    (!item?.authorId &&
      item?.author &&
      currentUser.name &&
      String(item.author) === String(currentUser.name));

  const getInitial = (name = "") => {
    const trimmed = String(name || "뚝딱").trim();
    return trimmed.slice(0, 1).toUpperCase();
  };

  const getAuthorAvatar = (item) => {
    if (!item) return "";
    if (item.authorAvatar) return item.authorAvatar;
    if (
      currentUser.avatarUrl &&
      ((item.authorId && String(item.authorId) === String(currentUser.id)) ||
        (!item.authorId && item.author && item.author === currentUser.name))
    ) {
      return currentUser.avatarUrl;
    }
    return "";
  };

  const renderAuthorAvatar = (name, avatarUrl = "") => (
    <span className="community-author-avatar">
      {avatarUrl ? (
        <img src={avatarUrl} alt="프로필 사진" />
      ) : (
        getInitial(name)
      )}
    </span>
  );

  useEffect(() => {
    let mounted = true;

    const loadPosts = async () => {
      const nextPosts = await getCommunityPosts();
      if (mounted) setPosts(nextPosts);
    };

    loadPosts();

    window.addEventListener(COMMUNITY_POSTS_UPDATED, loadLocalPosts);
    window.addEventListener("storage", loadLocalPosts);

    return () => {
      mounted = false;
      window.removeEventListener(COMMUNITY_POSTS_UPDATED, loadLocalPosts);
      window.removeEventListener("storage", loadLocalPosts);
    };
  }, []);

  useEffect(() => {
    if (!selectedPostId) {
      closingDetailRef.current = false;
      setDetailMenuOpen(false);
      setDetailPost(null);
      return;
    }
    if (closingDetailRef.current) return;
    if (!selectedPostId || posts.length === 0) return;
    if (detailPost?.id === selectedPostId) return;

    const selectedPost = posts.find((post) => post.id === selectedPostId);
    if (selectedPost) {
      openPostDetail(selectedPost, { keepQuery: true });
    }
  }, [selectedPostId, posts, detailPost?.id]);

  useEffect(() => {
    if (!selectedPostId) return;

    const handlePopState = () => {
      setDetailMenuOpen(false);
      setDetailPost(null);
      setSearchParams({}, { replace: true });
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [selectedPostId, setSearchParams]);

  useEffect(() => {
    const closeOnEscape = (event) => {
      if (event.key !== "Escape") return;

      if (editingImage) {
        setEditingImage(null);
        return;
      }

      if (detailPost) {
        closePostDetail();
        return;
      }

      if (writeOpen) {
        setWriteOpen(false);
        setEditingPostId("");
      }
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [detailPost, editingImage, writeOpen]);

  const filteredPosts = useMemo(() => {
    if (activeCategory === "all") return posts;
    return posts.filter((post) => post.category === activeCategory);
  }, [activeCategory, posts]);

  const hotPosts = useMemo(
    () =>
      [...posts]
        .filter((post) => Number(post.views) > 0)
        .sort((a, b) => Number(b.views) - Number(a.views))
        .slice(0, 2),
    [posts]
  );

  const activeCategoryLabel =
    communityCategories.find((category) => category.id === activeCategory)
      ?.label || "전체";

  const resetForm = () => {
    setEditingPostId("");
    setForm({
      category: "reviews",
      title: "",
      content: "",
      images: [],
    });
  };

  const openWriteModal = () => {
    resetForm();
    setWriteOpen(true);
  };

  const openEditPost = (post) => {
    setDetailMenuOpen(false);
    setEditingPostId(post.id);
    setForm({
      category: post.category,
      title: post.title,
      content: post.content,
      images: post.images || [],
    });
    closePostDetail();
    setWriteOpen(true);
  };

  const handleImageChange = (event) => {
    const files = Array.from(event.target.files || []);
    if (files.length === 0) return;

    Promise.all(
      files.map(async (file, index) => ({
        id: `upload-${Date.now()}-${index}`,
        src: await resizeImageFile(file),
        size: "wide",
      }))
    ).then((images) => {
      setForm((prev) => ({
        ...prev,
        images: [...prev.images, ...images].slice(0, 8),
      }));
    });

    event.target.value = "";
  };

  const updateFormImage = (imageId, nextValues) => {
    setForm((prev) => ({
      ...prev,
      images: prev.images.map((image) =>
        image.id === imageId ? { ...image, ...nextValues } : image
      ),
    }));
  };

  const removeFormImage = (imageId) => {
    setForm((prev) => ({
      ...prev,
      images: prev.images.filter((image) => image.id !== imageId),
    }));
  };

  const openImageEditor = (image) => {
    setEditingImage({
      id: image.id,
      src: image.src,
      zoom: 1,
      offsetX: 0,
      offsetY: 0,
      ratio: "4:3",
    });
  };

  const applyPostUpdate = (postId, updater) => {
    const basePost =
      detailPost?.id === postId
        ? detailPost
        : posts.find((post) => post.id === postId);

    if (!basePost) return null;

    const optimisticPost = updater(basePost);
    const sourcePosts =
      posts.length > 0 ? posts : getStoredCommunityPosts();
    const hasPost = sourcePosts.some((post) => post.id === postId);
    const nextPosts = sourcePosts.map((post) =>
      post.id === postId ? optimisticPost : post
    );
    const savedPosts = hasPost ? nextPosts : [optimisticPost, ...nextPosts];

    setPosts(savedPosts);
    saveCommunityPosts(savedPosts, { syncRemote: false });
    syncCommunityPost(optimisticPost);

    if (detailPost?.id === postId) {
      setDetailPost(optimisticPost);
    }

    return optimisticPost;
  };

  const saveImageEdit = async () => {
    if (!editingImage) return;

    const editedImage = await cropImage(editingImage);

    updateFormImage(editingImage.id, {
      src: editedImage,
      size:
        editingImage.ratio === "1:1"
          ? "square"
          : editingImage.ratio === "3:4"
          ? "portrait"
          : "wide",
    });
    setEditingImage(null);
  };

  const handleCreatePost = (event) => {
    event.preventDefault();

    const title = form.title.trim();
    const content = form.content.trim();

    if (!title || !content) {
      alert("제목과 내용을 입력해주세요.");
      return;
    }

    if (editingPostId) {
      const updatedPost = applyPostUpdate(editingPostId, (currentPost) => ({
        ...currentPost,
        category: form.category,
        title,
        content,
        excerpt: content,
        images: form.images,
        image: form.images[0]?.src || "",
        updatedAt: new Date().toISOString(),
      }));

      resetForm();
      setWriteOpen(false);
      setActiveCategory(updatedPost?.category || form.category);
      return;
    }

    const currentUser = getCurrentUser();
    const createdPost = createCommunityPost({
      category: form.category,
      title,
      content,
      images: form.images,
      author: currentUser.name,
      authorId: currentUser.id,
      authorAvatar: currentUser.avatarUrl,
    });

    setPosts((prev) => {
      const withoutDuplicate = prev.filter((post) => post.id !== createdPost.id);
      return [createdPost, ...withoutDuplicate];
    });

    resetForm();
    setWriteOpen(false);
    setActiveCategory(form.category);
  };

  const handleDeletePost = async (postId) => {
    if (!window.confirm("이 글을 삭제할까요?")) return;

    setDetailMenuOpen(false);
    setPosts((prev) => prev.filter((post) => post.id !== postId));
    closePostDetail();
    await deleteCommunityPost(postId);
  };

  const closePostDetail = () => {
    closingDetailRef.current = true;
    setDetailMenuOpen(false);
    setSearchParams({}, { replace: true });
    setDetailPost(null);
    window.requestAnimationFrame(() => {
      closingDetailRef.current = false;
    });
  };

  const openPostDetail = (post, options = {}) => {
    setCommentText("");
    setReplyDrafts({});
    setEditingComment(null);
    setSelectedImageIndex(0);
    setDetailMenuOpen(false);

    if (!options.keepQuery) {
      setSearchParams({ post: post.id }, { replace: true });
    }

    const optimisticPost = {
      ...post,
      views: Number(post.views || 0) + 1,
    };
    setDetailPost(optimisticPost);

    try {
      const updatedPost = applyPostUpdate(post.id, (currentPost) => ({
        ...currentPost,
        views: Number(currentPost.views || 0) + 1,
      }));

      if (updatedPost) {
        setDetailPost(updatedPost);
      }
    } catch (error) {
      console.error("게시글 상세 열기 실패:", error);
    }
  };

  const handleAddComment = (event) => {
    event.preventDefault();

    const message = commentText.trim();
    if (!detailPost || !message) return;

    const updatedPost = applyPostUpdate(detailPost.id, (currentPost) => {
      const nextComment = {
        id: `comment-${Date.now()}`,
        author: getCurrentUser().name,
        authorId: getCurrentUser().id,
        authorAvatar: getCurrentUser().avatarUrl,
        message,
        createdAt: new Date().toISOString(),
      };
      const commentList = [...(currentPost.commentList || []), nextComment];

      return {
        ...currentPost,
        commentList,
        comments: countComments(commentList),
      };
    });

    setPosts((prev) =>
      prev.map((post) => (post.id === updatedPost?.id ? updatedPost : post))
    );
    setDetailPost(updatedPost);
    setCommentText("");
  };

  const handleToggleLike = (postId, event) => {
    if (event) event.stopPropagation();

    const updatedPost = applyPostUpdate(postId, (currentPost) => {
      const liked = !currentPost.liked;
      return {
        ...currentPost,
        liked,
        likes: Math.max(Number(currentPost.likes || 0) + (liked ? 1 : -1), 0),
      };
    });

    if (detailPost?.id === postId) {
      setDetailPost(updatedPost);
    }
    if (updatedPost) {
      setPosts((prev) =>
        prev.map((post) => (post.id === postId ? updatedPost : post))
      );
    }
  };

  const handleAddReply = (commentId) => {
    const message = (replyDrafts[commentId] || "").trim();
    if (!detailPost || !message) return;

    const updatedPost = applyPostUpdate(detailPost.id, (currentPost) => {
      const commentList = (currentPost.commentList || []).map((comment) =>
        comment.id === commentId
          ? {
              ...comment,
              replies: [
                ...(comment.replies || []),
                {
                  id: `reply-${Date.now()}`,
                  author: getCurrentUser().name,
                  authorId: getCurrentUser().id,
                  authorAvatar: getCurrentUser().avatarUrl,
                  message,
                  createdAt: new Date().toISOString(),
                },
              ],
            }
          : comment
      );

      return {
        ...currentPost,
        commentList,
        comments: countComments(commentList),
      };
    });

    setDetailPost(updatedPost);
    setPosts((prev) =>
      prev.map((post) => (post.id === updatedPost?.id ? updatedPost : post))
    );
    setReplyDrafts((prev) => ({ ...prev, [commentId]: "" }));
  };

  const handleDeleteComment = (commentId, replyId = null) => {
    if (!detailPost) return;

    const updatedPost = applyPostUpdate(detailPost.id, (currentPost) => {
      const commentList = replyId
        ? (currentPost.commentList || []).map((comment) =>
            comment.id === commentId
              ? {
                  ...comment,
                  replies: (comment.replies || []).filter(
                    (reply) => reply.id !== replyId
                  ),
                }
              : comment
          )
        : (currentPost.commentList || []).filter(
            (comment) => comment.id !== commentId
          );

      return {
        ...currentPost,
        commentList,
        comments: countComments(commentList),
      };
    });

    setDetailPost(updatedPost);
    setPosts((prev) =>
      prev.map((post) => (post.id === updatedPost?.id ? updatedPost : post))
    );
    setEditingComment(null);
  };

  const handleSaveCommentEdit = () => {
    if (!detailPost || !editingComment?.message.trim()) return;

    const updatedPost = applyPostUpdate(detailPost.id, (currentPost) => {
      const commentList = (currentPost.commentList || []).map((comment) => {
        if (editingComment.replyId && comment.id === editingComment.commentId) {
          return {
            ...comment,
            replies: (comment.replies || []).map((reply) =>
              reply.id === editingComment.replyId
                ? { ...reply, message: editingComment.message.trim() }
                : reply
            ),
          };
        }

        if (comment.id === editingComment.commentId) {
          return { ...comment, message: editingComment.message.trim() };
        }

        return comment;
      });

      return { ...currentPost, commentList };
    });

    setDetailPost(updatedPost);
    setPosts((prev) =>
      prev.map((post) => (post.id === updatedPost?.id ? updatedPost : post))
    );
    setEditingComment(null);
  };

  const moveDetailImage = (direction) => {
    if (!detailPost?.images?.length) return;

    setSelectedImageIndex((prev) => {
      const total = detailPost.images.length;
      return (prev + direction + total) % total;
    });
  };

  const renderPostCard = (post, compact = false) => {
    const firstImage = post.images?.[0];

    return (
    <article
      key={post.id}
      className="community-card"
      onClick={() => openPostDetail(post)}
      onMouseEnter={() => setHoveredKey(post.id)}
      onMouseLeave={() => setHoveredKey("")}
      style={{
        border: `1px solid ${CARD_BORDER}`,
        borderRadius: "8px",
        background: "#ffffff",
        overflow: "hidden",
        cursor: "pointer",
        transform: hoveredKey === post.id ? "translateY(-2px)" : "none",
        boxShadow:
          hoveredKey === post.id
            ? "0 14px 30px rgba(15, 23, 42, 0.08)"
            : "0 10px 24px rgba(15, 23, 42, 0.04)",
        transition:
          "transform 0.18s ease, box-shadow 0.18s ease, border-color 0.18s ease",
      }}
    >
      {firstImage && (
        <div
          className={`community-card-image image-size-${firstImage.size || "wide"}`}
          style={{
            aspectRatio: compact ? "2.2 / 1" : "1.45 / 1",
            background: "#F1F5F9",
            overflow: "hidden",
          }}
        >
          <img
            src={firstImage.src}
            alt={post.title}
            style={{
              width: "100%",
              height: "100%",
              display: "block",
              objectFit: "cover",
            }}
          />
          {post.images.length > 1 && (
            <span className="community-card-image-count">
              1/{post.images.length}
            </span>
          )}
        </div>
      )}

      <div style={{ padding: compact ? "16px" : "18px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "12px",
            marginBottom: "8px",
            color: TEXT_MUTED,
            fontSize: "12px",
            fontWeight: "800",
          }}
        >
          <span>{getCategoryLabel(post.category)}</span>
          <span>{formatCommunityTime(post.createdAt)}</span>
        </div>

        <h3
          style={{
            margin: "0 0 8px",
            color: TEXT_DARK,
            fontSize: compact ? "15px" : "17px",
            lineHeight: "1.45",
            letterSpacing: "-0.2px",
          }}
        >
          {post.title}
        </h3>

        {!compact && (
          <p
            style={{
              margin: "0 0 14px",
              color: TEXT_MUTED,
              fontSize: "14px",
              lineHeight: "1.7",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {post.excerpt}
          </p>
        )}

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            color: "#94A3B8",
            fontSize: "12px",
            fontWeight: "800",
          }}
        >
          <span>조회 {Number(post.views || 0).toLocaleString()}</span>
          <button
            type="button"
            className={`community-like-inline ${post.liked ? "active" : ""}`}
            onClick={(event) => handleToggleLike(post.id, event)}
          >
            좋아요 {Number(post.likes || 0).toLocaleString()}
          </button>
          <span>댓글 {Number(post.comments || 0).toLocaleString()}</span>
        </div>
      </div>
    </article>
  );
  };

  const renderTextPostRow = (post) => {
    const firstImage = post.images?.[0];

    return (
    <article
      key={post.id}
      className={`community-text-row ${firstImage ? "" : "no-image"}`}
      onClick={() => openPostDetail(post)}
      onMouseEnter={() => setHoveredKey(post.id)}
      onMouseLeave={() => setHoveredKey("")}
      style={{
        transform: hoveredKey === post.id ? "translateY(-1px)" : "none",
      }}
    >
      {firstImage && (
        <div className="community-row-thumb">
          <img src={firstImage.src} alt={post.title} />
        </div>
      )}

      <div className="community-row-content">
        <div className="community-row-kicker">
          {getCategoryLabel(post.category)}
        </div>
        <h3>{post.title}</h3>
        <p>{post.excerpt}</p>
        <div className="community-author-mini">
          {renderAuthorAvatar(post.author, getAuthorAvatar(post))}
          <span>{post.author || "뚝딱 회원"}</span>
        </div>
        <div className="community-row-meta">
          <span>{formatCommunityTime(post.createdAt)}</span>
          <span>조회 {Number(post.views || 0).toLocaleString()}</span>
          <button
            type="button"
            className={`community-like-inline ${post.liked ? "active" : ""}`}
            onClick={(event) => handleToggleLike(post.id, event)}
          >
            좋아요 {Number(post.likes || 0).toLocaleString()}
          </button>
          <span>댓글 {Number(post.comments || 0).toLocaleString()}</span>
        </div>
      </div>
    </article>
  );
  };

  const showPhotoGrid = false;

  return (
    <main
      style={{
        minHeight: "100vh",
        padding: "118px 24px 80px",
        background: "#FBFCFE",
        color: TEXT_DARK,
        fontFamily:
          '"Pretendard", "Noto Sans KR", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      }}
    >
      <div style={{ maxWidth: "1080px", margin: "0 auto" }}>
        <header className="community-page-header">
          <h1
            style={{
              margin: 0,
              fontSize: "34px",
              lineHeight: "1.2",
              letterSpacing: "-0.5px",
            }}
          >
            커뮤니티
          </h1>

          <button
            type="button"
            className="community-primary-button"
            onClick={openWriteModal}
          >
            글쓰기
          </button>
        </header>

        <div
          className="community-layout"
          style={{ display: detailPost ? "none" : undefined }}
        >
          <aside className="community-sidebar">
            {communityCategories.map((category) => {
              const isActive = activeCategory === category.id;

              return (
                <button
                  key={category.id}
                  type="button"
                  className="community-category-button"
                  onClick={() => setActiveCategory(category.id)}
                  style={{
                    background: isActive ? "#EAF3FF" : "transparent",
                    color: isActive ? BRAND_COLOR : "#334155",
                    fontWeight: isActive ? "900" : "700",
                  }}
                >
                  {category.label}
                </button>
              );
            })}
          </aside>

          <section>
            <button
              type="button"
              className="community-notice"
              onClick={() => setNoticeOpen((prev) => !prev)}
            >
              <span className="community-notice-text">
                <strong>공지</strong>
                <span>커뮤니티 글쓰기와 사진 첨부 기능을 사용할 수 있습니다.</span>
              </span>
              <span className="community-notice-arrow">
                {noticeOpen ? "∨" : ">"}
              </span>
            </button>

            {noticeOpen && (
              <div className="community-notice-panel">
                이용후기, 최근 요청 이야기, 작업 팁을 자유롭게 작성할 수
                있습니다. 사진을 함께 올리면 메인 화면 커뮤니티에도 표시됩니다.
              </div>
            )}

            {activeCategory === "all" && (
              <section style={{ marginBottom: "36px" }}>
                <div className="community-section-head">
                  <h2>지금 많이 보는 글</h2>
                  <span>
                    {hotPosts.length}/{posts.length}
                  </span>
                </div>

                <div className="hot-post-grid">
                  {hotPosts.length === 0
                    ? [1, 2].map((item) => (
                        <div key={item} className="community-empty-card">
                          아직 인기글이 없습니다.
                        </div>
                      ))
                    : hotPosts.map((post) => renderPostCard(post, true))}
                </div>
              </section>
            )}

            <section>
              <div className="community-latest-head">
                <div>
                  <div>최신 글</div>
                  <h2>
                    {activeCategory === "all"
                      ? "커뮤니티 게시글"
                      : activeCategoryLabel}
                  </h2>
                </div>
                <span>{filteredPosts.length}개</span>
              </div>

              {filteredPosts.length === 0 ? (
                <div className="community-empty-state">
                  <div>
                    <div className="community-empty-title">
                      아직 등록된 커뮤니티 글이 없습니다.
                    </div>
                    <p>
                      글쓰기 버튼으로 첫 게시글을 작성하면 이 영역과 메인 홈에
                      함께 표시됩니다.
                    </p>
                  </div>
                </div>
              ) : (
                <div
                  className={
                    showPhotoGrid
                      ? "community-review-grid"
                      : "community-text-list"
                  }
                >
                  {filteredPosts.map((post) =>
                    showPhotoGrid ? renderPostCard(post) : renderTextPostRow(post)
                  )}
                </div>
              )}
            </section>
          </section>
        </div>
      </div>

      {writeOpen && (
        <div
          className="community-modal-backdrop"
          onClick={() => {
            setWriteOpen(false);
            setEditingPostId("");
          }}
        >
          <form
            className="community-write-modal"
            onClick={(event) => event.stopPropagation()}
            onSubmit={handleCreatePost}
          >
            <div className="community-modal-head">
              <h2>{editingPostId ? "커뮤니티 글 수정" : "커뮤니티 글쓰기"}</h2>
              <button
                type="button"
                onClick={() => {
                  setWriteOpen(false);
                  setEditingPostId("");
                }}
              >
                ×
              </button>
            </div>

            <label>
              카테고리
              <select
                value={form.category}
                onChange={(event) =>
                  setForm((prev) => ({ ...prev, category: event.target.value }))
                }
              >
                {writableCategories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.label}
                  </option>
                ))}
              </select>
            </label>

            <label>
              제목
              <input
                value={form.title}
                onChange={(event) =>
                  setForm((prev) => ({ ...prev, title: event.target.value }))
                }
                placeholder="제목을 입력해주세요"
              />
            </label>

            <label>
              내용
              <textarea
                value={form.content}
                onChange={(event) =>
                  setForm((prev) => ({ ...prev, content: event.target.value }))
                }
                placeholder="작업 후기, 요청 이야기, 팁을 자유롭게 남겨주세요"
                rows={7}
              />
            </label>

            <label>
              사진 첨부
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageChange}
              />
            </label>

            <div className="community-photo-count">사진 {form.images.length}/8</div>

            {form.images.length > 0 && (
              <div className="community-image-editor">
                {form.images.map((image, index) => (
                  <div key={image.id} className="community-image-edit-item">
                    <div className={`community-image-preview image-size-${image.size}`}>
                      <img src={image.src} alt={`첨부한 사진 ${index + 1}`} />
                      <button
                        type="button"
                        className="community-image-remove"
                        onClick={() => removeFormImage(image.id)}
                        aria-label={`사진 ${index + 1} 삭제`}
                      >
                        ×
                      </button>
                    </div>
                    <div className="community-image-edit-controls">
                      <button type="button" onClick={() => openImageEditor(image)}>
                        수정하기
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="community-modal-actions">
              <button type="button" onClick={() => setWriteOpen(false)}>
                취소
              </button>
              <button type="submit">{editingPostId ? "수정하기" : "등록하기"}</button>
            </div>
          </form>
        </div>
      )}

      {detailPost && (
        <section
          className="community-detail-page"
          onClick={() => detailMenuOpen && setDetailMenuOpen(false)}
        >
          <button
            type="button"
            className="community-detail-back"
            onClick={closePostDetail}
          >
            ← 목록으로
          </button>

          <article className="community-detail-article">
            <div className="community-detail-page-head">
              <div>
                <div className="community-detail-breadcrumb">
                  커뮤니티 &gt; {getCategoryLabel(detailPost.category)}
                </div>
                <span className="community-detail-category">
                  {getCategoryLabel(detailPost.category)}
                </span>
                <h2>{detailPost.title}</h2>
                <div className="community-detail-author">
                  {renderAuthorAvatar(detailPost.author, getAuthorAvatar(detailPost))}
                  <strong>{detailPost.author || "뚝딱 회원"}</strong>
                </div>
              </div>
              <div className="community-detail-head-actions">
                <button
                  type="button"
                  className="community-more-button"
                  onClick={(event) => {
                    event.stopPropagation();
                    setDetailMenuOpen((prev) => !prev);
                  }}
                  aria-label="게시글 메뉴 열기"
                >
                  ⋮
                </button>
                {detailMenuOpen && (
                  <div className="community-more-menu">
                    {canManageDetailPost ? (
                      <>
                        <button
                          type="button"
                          onClick={(event) => {
                            event.stopPropagation();
                            openEditPost(detailPost);
                          }}
                        >
                          수정
                        </button>
                        <button
                          type="button"
                          className="danger"
                          onClick={(event) => {
                            event.stopPropagation();
                            handleDeletePost(detailPost.id);
                          }}
                        >
                          삭제
                        </button>
                      </>
                    ) : (
                      <button
                        type="button"
                        className="danger"
                        onClick={(event) => {
                          event.stopPropagation();
                          alert("신고가 접수되었습니다.");
                          setDetailMenuOpen(false);
                        }}
                      >
                        이 게시글 신고
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>

            {detailPost.images?.length > 0 && (
              <div className="community-detail-gallery">
                <div
                  className={`community-detail-image image-size-${
                    detailPost.images[selectedImageIndex]?.size || "wide"
                  }`}
                >
                  <img
                    src={detailPost.images[selectedImageIndex]?.src}
                    alt={detailPost.title}
                  />

                  {detailPost.images.length > 1 && (
                    <>
                      <button
                        type="button"
                        className="community-gallery-arrow prev"
                        onClick={() => moveDetailImage(-1)}
                        aria-label="이전 사진"
                      >
                        ‹
                      </button>
                      <button
                        type="button"
                        className="community-gallery-arrow next"
                        onClick={() => moveDetailImage(1)}
                        aria-label="다음 사진"
                      >
                        ›
                      </button>
                      <span className="community-gallery-count">
                        {selectedImageIndex + 1}/{detailPost.images.length}
                      </span>
                    </>
                  )}
                </div>

                {detailPost.images.length > 1 && (
                  <div className="community-detail-thumbs">
                    {detailPost.images.map((image, index) => (
                      <button
                        key={image.id}
                        type="button"
                        className={selectedImageIndex === index ? "active" : ""}
                        onClick={() => setSelectedImageIndex(index)}
                      >
                        <img src={image.src} alt={`사진 ${index + 1}`} />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            <p>{detailPost.content}</p>

            <div className="community-detail-meta">
              <span>{formatCommunityTime(detailPost.createdAt)}</span>
              <span>조회 {Number(detailPost.views || 0).toLocaleString()}</span>
              <button
                type="button"
                className={`community-like-inline ${detailPost.liked ? "active" : ""}`}
                onClick={(event) => handleToggleLike(detailPost.id, event)}
              >
                좋아요 {Number(detailPost.likes || 0).toLocaleString()}
              </button>
              <span>댓글 {Number(detailPost.comments || 0).toLocaleString()}</span>
            </div>

            <section className="community-comments">
              <h3>댓글</h3>

              {(detailPost.commentList || []).length === 0 ? (
                <div className="community-comment-empty">
                  아직 댓글이 없습니다.
                </div>
              ) : (
                <div className="community-comment-list">
                  {detailPost.commentList.map((comment) => (
                    <div key={comment.id} className="community-comment">
                      <div className="community-comment-head">
                        <div className="community-comment-profile">
                          {renderAuthorAvatar(comment.author, getAuthorAvatar(comment))}
                          <strong>{comment.author}</strong>
                        </div>
                        <span>{formatCommunityTime(comment.createdAt)}</span>
                      </div>

                      {editingComment?.commentId === comment.id &&
                      !editingComment.replyId ? (
                        <div className="community-comment-edit">
                          <input
                            value={editingComment.message}
                            onChange={(event) =>
                              setEditingComment((prev) => ({
                                ...prev,
                                message: event.target.value,
                              }))
                            }
                          />
                          <button type="button" onClick={handleSaveCommentEdit}>
                            저장
                          </button>
                          <button type="button" onClick={() => setEditingComment(null)}>
                            취소
                          </button>
                        </div>
                      ) : (
                        <p>{comment.message}</p>
                      )}

                      {canManageAuthorContent(comment) && (
                        <div className="community-comment-actions">
                          <button
                            type="button"
                            onClick={() =>
                              setEditingComment({
                                commentId: comment.id,
                                message: comment.message,
                              })
                            }
                          >
                            수정
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteComment(comment.id)}
                          >
                            삭제
                          </button>
                        </div>
                      )}

                      {(comment.replies || []).length > 0 && (
                        <div className="community-replies">
                          {comment.replies.map((reply) => (
                            <div key={reply.id} className="community-reply">
                              <div className="community-comment-head">
                                <div className="community-comment-profile">
                                  {renderAuthorAvatar(reply.author, getAuthorAvatar(reply))}
                                  <strong>{reply.author}</strong>
                                </div>
                                <span>{formatCommunityTime(reply.createdAt)}</span>
                              </div>
                              {editingComment?.commentId === comment.id &&
                              editingComment.replyId === reply.id ? (
                                <div className="community-comment-edit">
                                  <input
                                    value={editingComment.message}
                                    onChange={(event) =>
                                      setEditingComment((prev) => ({
                                        ...prev,
                                        message: event.target.value,
                                      }))
                                    }
                                  />
                                  <button type="button" onClick={handleSaveCommentEdit}>
                                    저장
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => setEditingComment(null)}
                                  >
                                    취소
                                  </button>
                                </div>
                              ) : (
                                <p>{reply.message}</p>
                              )}
                              {canManageAuthorContent(reply) && (
                                <div className="community-comment-actions">
                                  <button
                                    type="button"
                                    onClick={() =>
                                      setEditingComment({
                                        commentId: comment.id,
                                        replyId: reply.id,
                                        message: reply.message,
                                      })
                                    }
                                  >
                                    수정
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() =>
                                      handleDeleteComment(comment.id, reply.id)
                                    }
                                  >
                                    삭제
                                  </button>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      )}

                      <div className="community-reply-form">
                        <input
                          value={replyDrafts[comment.id] || ""}
                          onChange={(event) =>
                            setReplyDrafts((prev) => ({
                              ...prev,
                              [comment.id]: event.target.value,
                            }))
                          }
                          placeholder="답글을 입력해주세요"
                        />
                        <button
                          type="button"
                          onClick={() => handleAddReply(comment.id)}
                        >
                          답글
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <form className="community-comment-form" onSubmit={handleAddComment}>
                <input
                  value={commentText}
                  onChange={(event) => setCommentText(event.target.value)}
                  placeholder="댓글을 입력해주세요"
                />
                <button type="submit">등록</button>
              </form>
            </section>

            <div className="community-detail-bottom-actions">
              <button
                type="button"
                className="community-detail-bottom-back"
                onClick={closePostDetail}
              >
                목록으로
              </button>
            </div>
          </article>
        </section>
      )}

      {editingImage && (
        <div
          className="community-modal-backdrop image-editor-backdrop"
          onClick={() => setEditingImage(null)}
        >
          <div
            className="community-crop-modal"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="community-modal-head">
              <h2>사진 수정하기</h2>
              <button type="button" onClick={() => setEditingImage(null)}>
                ×
              </button>
            </div>

            <div
              className={`community-crop-stage ratio-${editingImage.ratio.replace(
                ":",
                "-"
              )}`}
            >
              <img
                src={editingImage.src}
                alt="편집 중인 사진"
                style={{
                  transform: `translate(${editingImage.offsetX}%, ${editingImage.offsetY}%) scale(${editingImage.zoom})`,
                }}
              />
              <div className="community-crop-frame" />
            </div>

            <div className="community-crop-ratios">
              {["4:3", "1:1", "3:4"].map((ratio) => (
                <button
                  key={ratio}
                  type="button"
                  className={editingImage.ratio === ratio ? "active" : ""}
                  onClick={() =>
                    setEditingImage((prev) => ({ ...prev, ratio }))
                  }
                >
                  {ratio}
                </button>
              ))}
            </div>

            <label className="community-crop-control">
              확대
              <input
                type="range"
                min="1"
                max="2.8"
                step="0.05"
                value={editingImage.zoom}
                onChange={(event) =>
                  setEditingImage((prev) => ({
                    ...prev,
                    zoom: Number(event.target.value),
                  }))
                }
              />
            </label>

            <label className="community-crop-control">
              좌우 위치
              <input
                type="range"
                min="-35"
                max="35"
                step="1"
                value={editingImage.offsetX}
                onChange={(event) =>
                  setEditingImage((prev) => ({
                    ...prev,
                    offsetX: Number(event.target.value),
                  }))
                }
              />
            </label>

            <label className="community-crop-control">
              상하 위치
              <input
                type="range"
                min="-35"
                max="35"
                step="1"
                value={editingImage.offsetY}
                onChange={(event) =>
                  setEditingImage((prev) => ({
                    ...prev,
                    offsetY: Number(event.target.value),
                  }))
                }
              />
            </label>

            <div className="community-modal-actions">
              <button type="button" onClick={() => setEditingImage(null)}>
                취소
              </button>
              <button type="button" onClick={saveImageEdit}>
                적용하기
              </button>
            </div>
          </div>
        </div>
      )}

      <style>
        {`
          .community-page-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 18px;
            margin-bottom: 34px;
          }

          .community-primary-button {
            border: none;
            border-radius: 12px;
            background: ${BRAND_COLOR};
            color: #ffffff;
            height: 44px;
            padding: 0 20px;
            font-size: 14px;
            font-weight: 900;
            cursor: pointer;
            box-shadow: 0 12px 24px rgba(47, 128, 237, 0.18);
            transition: transform 0.18s ease, box-shadow 0.18s ease, background-color 0.18s ease;
          }

          .community-primary-button:hover {
            background: #1f6fd6;
            transform: translateY(-1px);
            box-shadow: 0 16px 30px rgba(47, 128, 237, 0.24);
          }

          .community-layout {
            display: grid;
            grid-template-columns: 200px minmax(0, 1fr);
            gap: 34px;
            align-items: start;
          }

          .community-sidebar {
            display: grid;
            gap: 8px;
            position: sticky;
            top: 104px;
          }

          .community-category-button {
            border: none;
            border-radius: 8px;
            padding: 14px 16px;
            font-size: 14px;
            text-align: left;
            cursor: pointer;
            transition: color 0.18s ease, background-color 0.18s ease, transform 0.18s ease;
          }

          .community-category-button:hover {
            background: #f1f7ff !important;
            color: ${BRAND_COLOR} !important;
            transform: translateX(2px);
          }

          .community-notice {
            width: 100%;
            min-height: 54px;
            border: 1px solid ${CARD_BORDER};
            border-radius: 8px;
            background: #f1f5f9;
            color: ${TEXT_DARK};
            padding: 0 18px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 16px;
            cursor: pointer;
            margin-bottom: 12px;
            transition: background-color 0.18s ease, border-color 0.18s ease, transform 0.18s ease;
          }

          .community-notice:hover {
            background: #eaf3ff;
            border-color: #bfd7ff;
            transform: translateY(-1px);
          }

          .community-notice-text {
            display: flex;
            align-items: center;
            gap: 8px;
            min-width: 0;
            font-size: 14px;
            line-height: 1.5;
          }

          .community-notice-text span {
            color: #475569;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }

          .community-notice-arrow {
            color: #94a3b8;
            font-weight: 900;
          }

          .community-notice-panel {
            margin-bottom: 34px;
            border: 1px solid ${CARD_BORDER};
            border-radius: 8px;
            background: #ffffff;
            padding: 16px 18px;
            color: ${TEXT_MUTED};
            font-size: 14px;
            line-height: 1.7;
          }

          .community-section-head,
          .community-latest-head {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 12px;
            margin-bottom: 16px;
          }

          .community-section-head h2,
          .community-latest-head h2 {
            margin: 0;
            color: ${TEXT_DARK};
            letter-spacing: -0.2px;
          }

          .community-section-head h2 {
            font-size: 20px;
          }

          .community-latest-head h2 {
            font-size: 21px;
          }

          .community-section-head span,
          .community-latest-head span {
            color: ${TEXT_MUTED};
            font-size: 13px;
            font-weight: 800;
          }

          .community-latest-head div div {
            color: ${BRAND_COLOR};
            font-size: 13px;
            font-weight: 900;
            margin-bottom: 5px;
          }

          .hot-post-grid {
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 12px;
          }

          .community-empty-card,
          .community-empty-state {
            border: 1px dashed ${CARD_BORDER};
            border-radius: 8px;
            background: #ffffff;
            color: ${TEXT_MUTED};
          }

          .community-empty-card {
            min-height: 84px;
            padding: 18px;
            font-size: 14px;
            font-weight: 700;
            display: flex;
            align-items: center;
          }

          .community-empty-state {
            min-height: 220px;
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;
            padding: 32px;
          }

          .community-empty-title {
            color: ${TEXT_DARK};
            font-size: 17px;
            font-weight: 900;
            margin-bottom: 8px;
          }

          .community-empty-state p {
            margin: 0;
            color: ${TEXT_MUTED};
            font-size: 14px;
            line-height: 1.7;
          }

          .community-post-list,
          .community-text-list {
            display: grid;
            gap: 14px;
          }

          .community-review-grid {
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 14px;
          }

          .community-text-row {
            display: grid;
            grid-template-columns: 120px minmax(0, 1fr);
            gap: 16px;
            border-bottom: 1px solid ${CARD_BORDER};
            padding: 18px 8px 18px;
            cursor: pointer;
            transition: transform 0.18s ease, background-color 0.18s ease;
          }

          .community-text-row:hover {
            background: #f8fbff;
          }

          .community-text-row.no-image {
            grid-template-columns: 1fr;
          }

          .community-row-thumb {
            width: 120px;
            aspect-ratio: 1.25 / 1;
            border-radius: 8px;
            overflow: hidden;
            background: #f1f5f9;
          }

          .community-row-thumb img {
            width: 100%;
            height: 100%;
            display: block;
            object-fit: cover;
          }

          .community-row-content {
            min-width: 0;
          }

          .community-row-kicker {
            color: #94a3b8;
            font-size: 12px;
            font-weight: 800;
            margin-bottom: 8px;
          }

          .community-text-row h3 {
            margin: 0 0 8px;
            color: ${TEXT_DARK};
            font-size: 16px;
            line-height: 1.45;
          }

          .community-text-row p {
            margin: 0 0 12px;
            color: #475569;
            font-size: 14px;
            line-height: 1.7;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }

          .community-row-meta {
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            gap: 12px;
            color: #94a3b8;
            font-size: 12px;
            font-weight: 800;
          }

          .community-author-mini,
          .community-detail-author,
          .community-comment-profile {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            min-width: 0;
          }

          .community-author-mini {
            margin: -2px 0 12px;
            color: #64748b;
            font-size: 12px;
            font-weight: 800;
          }

          .community-author-avatar {
            width: 26px;
            height: 26px;
            border-radius: 999px;
            background: #eaf3ff;
            color: ${BRAND_COLOR};
            display: inline-flex;
            align-items: center;
            justify-content: center;
            flex: 0 0 auto;
            font-size: 12px;
            font-weight: 900;
            overflow: hidden;
          }

          .community-author-avatar img {
            width: 100%;
            height: 100%;
            display: block;
            object-fit: cover;
          }

          .community-detail-author {
            margin-top: 10px;
            color: #475569;
            font-size: 13px;
          }

          .community-detail-page {
            width: min(760px, calc(100% - 48px));
            margin: 0 auto;
            padding: 6px 0 40px;
          }

          .community-detail-back {
            border: none;
            background: transparent;
            color: ${TEXT_MUTED};
            padding: 0;
            margin-bottom: 34px;
            font-size: 14px;
            font-weight: 800;
            cursor: pointer;
            transition: color 0.18s ease, transform 0.18s ease;
          }

          .community-detail-back:hover {
            color: ${BRAND_COLOR};
            transform: translateX(-2px);
          }

          .community-detail-article {
            background: transparent;
          }

          .community-detail-page-head {
            display: flex;
            align-items: flex-end;
            justify-content: space-between;
            gap: 24px;
            padding-bottom: 26px;
            border-bottom: 1px solid ${CARD_BORDER};
            margin-bottom: 30px;
          }

          .community-detail-breadcrumb {
            color: #b4c0d0;
            font-size: 13px;
            font-weight: 800;
            margin-bottom: 34px;
          }

          .community-detail-category {
            display: block;
            color: ${TEXT_MUTED};
            font-size: 14px;
            font-weight: 900;
            margin-bottom: 10px;
          }

          .community-detail-page-head h2 {
            margin: 0;
            color: ${TEXT_DARK};
            font-size: 25px;
            line-height: 1.45;
            letter-spacing: -0.35px;
          }

          .community-detail-head-actions {
            position: relative;
            flex: 0 0 auto;
          }

          .community-more-button {
            width: 36px;
            height: 36px;
            border: none;
            border-radius: 999px;
            background: transparent;
            color: #111827;
            font-size: 26px;
            line-height: 1;
            cursor: pointer;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            transition: background-color 0.18s ease, transform 0.18s ease;
          }

          .community-more-button:hover {
            background: #f1f5f9;
            transform: translateY(-1px);
          }

          .community-more-menu {
            position: absolute;
            top: 42px;
            right: 0;
            z-index: 5;
            min-width: 116px;
            padding: 6px;
            border: 1px solid ${CARD_BORDER};
            border-radius: 8px;
            background: #ffffff;
            box-shadow: 0 14px 32px rgba(15, 23, 42, 0.12);
          }

          .community-more-menu button {
            width: 100%;
            height: 36px;
            border: none;
            border-radius: 6px;
            background: transparent;
            color: ${TEXT_DARK};
            font-family: inherit;
            font-size: 14px;
            font-weight: 800;
            text-align: left;
            padding: 0 10px;
            cursor: pointer;
          }

          .community-more-menu button:hover {
            background: #f8fbff;
            color: ${BRAND_COLOR};
          }

          .community-more-menu button.danger:hover {
            background: #fff1f2;
            color: #e11d48;
          }

          .community-card-image {
            position: relative;
          }

          .community-card-image-count {
            position: absolute;
            right: 10px;
            bottom: 10px;
            padding: 5px 8px;
            border-radius: 999px;
            background: rgba(15, 23, 42, 0.68);
            color: #ffffff;
            font-size: 12px;
            font-weight: 900;
          }

          .community-like-inline {
            border: none;
            background: transparent;
            color: #94a3b8;
            padding: 0;
            font: inherit;
            cursor: pointer;
            transition: color 0.18s ease, transform 0.18s ease;
          }

          .community-like-inline:hover,
          .community-like-inline.active {
            color: ${BRAND_COLOR};
            transform: translateY(-1px);
          }

          .community-modal-backdrop {
            position: fixed;
            inset: 0;
            z-index: 200;
            background: rgba(15, 23, 42, 0.42);
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
          }

          .community-write-modal {
            width: min(980px, 100%);
            max-height: calc(100vh - 40px);
            overflow: auto;
            border-radius: 14px;
            background: #ffffff;
            box-shadow: 0 24px 70px rgba(15, 23, 42, 0.22);
            padding: 24px;
          }

          .community-detail-modal {
            width: min(640px, 100%);
            max-height: calc(100vh - 40px);
            overflow: auto;
            border-radius: 14px;
            background: #ffffff;
            box-shadow: 0 24px 70px rgba(15, 23, 42, 0.22);
            padding: 24px;
          }

          .community-modal-head {
            display: flex;
            align-items: flex-start;
            justify-content: space-between;
            gap: 16px;
            margin-bottom: 18px;
          }

          .community-modal-head h2 {
            margin: 0;
            color: ${TEXT_DARK};
            font-size: 22px;
            line-height: 1.35;
          }

          .community-modal-head span {
            display: block;
            margin-bottom: 6px;
            color: ${BRAND_COLOR};
            font-size: 13px;
            font-weight: 900;
          }

          .community-modal-head button {
            border: none;
            background: #f1f5f9;
            color: ${TEXT_MUTED};
            width: 34px;
            height: 34px;
            border-radius: 999px;
            font-size: 22px;
            line-height: 1;
            cursor: pointer;
            transition: background-color 0.18s ease, color 0.18s ease;
          }

          .community-modal-head button:hover {
            background: #eaf3ff;
            color: ${BRAND_COLOR};
          }

          .community-write-modal label {
            display: grid;
            gap: 8px;
            margin-bottom: 18px;
            color: ${TEXT_DARK};
            font-size: 14px;
            font-weight: 800;
          }

          .community-write-modal input,
          .community-write-modal select,
          .community-write-modal textarea {
            width: 100%;
            box-sizing: border-box;
            border: none;
            border-bottom: 1px solid ${CARD_BORDER};
            border-radius: 0;
            padding: 13px 0;
            color: ${TEXT_DARK};
            font-size: 14px;
            font-family: inherit;
            outline: none;
            transition: border-color 0.18s ease, box-shadow 0.18s ease;
          }

          .community-write-modal input:focus,
          .community-write-modal select:focus,
          .community-write-modal textarea:focus {
            border-color: ${BRAND_COLOR};
            box-shadow: none;
          }

          .community-write-modal textarea {
            min-height: 140px;
            resize: vertical;
          }

          .community-photo-count {
            display: inline-flex;
            align-items: center;
            color: ${TEXT_MUTED};
            font-size: 13px;
            font-weight: 900;
            margin: -4px 0 14px;
          }

          .community-image-editor {
            display: flex;
            flex-wrap: wrap;
            gap: 12px;
            margin: 4px 0 22px;
          }

          .community-image-edit-item {
            width: 82px;
            position: relative;
          }

          .community-image-preview {
            width: 82px;
            height: 82px;
            margin: 0;
            border: 1px solid ${CARD_BORDER};
            border-radius: 8px;
            overflow: hidden;
            position: relative;
            background: #f1f5f9;
          }

          .community-image-preview img,
          .community-detail-image img {
            width: 100%;
            display: block;
            object-fit: cover;
          }

          .community-image-preview.image-size-wide,
          .community-image-preview.image-size-square,
          .community-image-preview.image-size-portrait {
            aspect-ratio: auto;
          }

          .community-detail-image.image-size-wide {
            aspect-ratio: 1.55 / 1;
          }

          .community-detail-image.image-size-square {
            aspect-ratio: 1 / 1;
          }

          .community-detail-image.image-size-portrait {
            aspect-ratio: 3 / 4;
          }

          .community-image-preview img,
          .community-detail-image img {
            height: 100%;
          }

          .community-image-preview img {
            max-height: none;
          }

          .community-image-remove {
            position: absolute;
            top: 5px;
            right: 5px;
            width: 22px;
            height: 22px;
            border: none;
            border-radius: 999px;
            background: #ef4444;
            color: #ffffff;
            font-size: 16px;
            line-height: 1;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .community-image-edit-controls {
            margin-top: 6px;
          }

          .community-image-edit-controls button {
            width: 100%;
            height: 30px;
            border: 1px solid ${CARD_BORDER};
            border-radius: 8px;
            background: #ffffff;
            color: ${TEXT_MUTED};
            font-family: inherit;
            font-size: 12px;
            font-weight: 800;
            cursor: pointer;
            padding: 0 6px;
            transition: background-color 0.18s ease, color 0.18s ease, border-color 0.18s ease;
          }

          .community-image-edit-controls button:hover {
            background: #f8fbff;
            border-color: #bfd7ff;
            color: ${BRAND_COLOR};
          }

          .community-modal-actions {
            display: flex;
            justify-content: flex-end;
            gap: 10px;
            margin-top: 18px;
          }

          .community-modal-actions button {
            border: 1px solid ${CARD_BORDER};
            border-radius: 10px;
            height: 42px;
            padding: 0 16px;
            background: #ffffff;
            color: ${TEXT_DARK};
            cursor: pointer;
            font-weight: 900;
            transition: background-color 0.18s ease, color 0.18s ease, transform 0.18s ease;
          }

          .community-modal-actions button:hover {
            background: #f8fbff;
            color: ${BRAND_COLOR};
            transform: translateY(-1px);
          }

          .community-modal-actions button[type="submit"] {
            border-color: ${BRAND_COLOR};
            background: ${BRAND_COLOR};
            color: #ffffff;
          }

          .community-modal-actions button[type="submit"]:hover {
            background: #1f6fd6;
            color: #ffffff;
          }

          .community-detail-gallery {
            margin-bottom: 28px;
          }

          .community-detail-image {
            position: relative;
            border-radius: 8px;
            overflow: hidden;
            background: #f1f5f9;
          }

          .community-gallery-arrow {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            width: 38px;
            height: 38px;
            border: none;
            border-radius: 999px;
            background: rgba(255, 255, 255, 0.92);
            color: ${TEXT_DARK};
            font-size: 28px;
            line-height: 1;
            cursor: pointer;
            box-shadow: 0 8px 18px rgba(15, 23, 42, 0.14);
            display: flex;
            align-items: center;
            justify-content: center;
            transition: transform 0.18s ease, background-color 0.18s ease, color 0.18s ease;
          }

          .community-gallery-arrow:hover {
            background: ${BRAND_COLOR};
            color: #ffffff;
            transform: translateY(-50%) scale(1.04);
          }

          .community-gallery-arrow.prev {
            left: 12px;
          }

          .community-gallery-arrow.next {
            right: 12px;
          }

          .community-gallery-count {
            position: absolute;
            right: 12px;
            bottom: 12px;
            padding: 6px 9px;
            border-radius: 999px;
            background: rgba(15, 23, 42, 0.7);
            color: #ffffff;
            font-size: 12px;
            font-weight: 900;
          }

          .community-detail-thumbs {
            display: flex;
            gap: 8px;
            margin-top: 10px;
            overflow-x: auto;
            padding-bottom: 2px;
          }

          .community-detail-thumbs button {
            width: 74px;
            height: 56px;
            border: 2px solid transparent;
            border-radius: 8px;
            overflow: hidden;
            padding: 0;
            background: #f1f5f9;
            cursor: pointer;
          }

          .community-detail-thumbs button.active {
            border-color: ${BRAND_COLOR};
          }

          .community-detail-thumbs img {
            width: 100%;
            height: 100%;
            display: block;
            object-fit: cover;
          }

          .community-detail-article > p,
          .community-detail-modal p {
            margin: 0 0 34px;
            color: #334155;
            font-size: 16px;
            line-height: 1.9;
            white-space: pre-wrap;
          }

          .community-detail-meta {
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            gap: 12px;
            padding-bottom: 22px;
            border-bottom: 1px solid ${CARD_BORDER};
            color: ${TEXT_MUTED};
            font-size: 13px;
            font-weight: 800;
          }

          .community-comments {
            margin-top: 22px;
            padding-top: 0;
          }

          .community-comments h3 {
            margin: 0 0 12px;
            color: ${TEXT_DARK};
            font-size: 17px;
          }

          .community-comment-empty {
            border: 1px dashed ${CARD_BORDER};
            border-radius: 8px;
            padding: 16px;
            color: ${TEXT_MUTED};
            font-size: 14px;
            font-weight: 700;
            margin-bottom: 12px;
          }

          .community-comment-list {
            display: grid;
            gap: 10px;
            margin-bottom: 12px;
          }

          .community-comment {
            border: 1px solid ${CARD_BORDER};
            border-radius: 8px;
            padding: 12px;
            background: #f8fafc;
          }

          .community-comment-head {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 10px;
            margin-bottom: 6px;
            font-size: 12px;
          }

          .community-comment-profile strong {
            color: ${TEXT_DARK};
            font-size: 13px;
          }

          .community-comment strong {
            color: ${TEXT_DARK};
          }

          .community-comment span {
            color: ${TEXT_MUTED};
            font-weight: 800;
          }

          .community-comment p {
            margin: 0;
            color: #334155;
            font-size: 14px;
            line-height: 1.6;
          }

          .community-comment-actions {
            display: flex;
            gap: 8px;
            margin-top: 8px;
          }

          .community-comment-actions button {
            border: none;
            background: transparent;
            color: ${TEXT_MUTED};
            padding: 0;
            font-size: 12px;
            font-weight: 800;
            cursor: pointer;
          }

          .community-comment-actions button:hover {
            color: ${BRAND_COLOR};
          }

          .community-replies {
            display: grid;
            gap: 8px;
            margin-top: 12px;
            padding-left: 14px;
            border-left: 2px solid ${CARD_BORDER};
          }

          .community-reply {
            border-radius: 8px;
            background: #ffffff;
            padding: 10px;
          }

          .community-reply-form,
          .community-comment-edit {
            display: grid;
            grid-template-columns: minmax(0, 1fr) auto;
            gap: 8px;
            margin-top: 10px;
          }

          .community-comment-edit {
            grid-template-columns: minmax(0, 1fr) 56px 56px;
          }

          .community-reply-form input,
          .community-comment-edit input {
            border: 1px solid ${CARD_BORDER};
            border-radius: 8px;
            height: 36px;
            padding: 0 11px;
            font-family: inherit;
            outline: none;
          }

          .community-reply-form button,
          .community-comment-edit button {
            border: 1px solid ${CARD_BORDER};
            border-radius: 8px;
            background: #ffffff;
            color: ${TEXT_DARK};
            padding: 0 12px;
            font-weight: 800;
            cursor: pointer;
          }

          .community-comment-form {
            display: grid;
            grid-template-columns: minmax(0, 1fr) 72px;
            gap: 8px;
          }

          .community-comment-form input {
            border: 1px solid ${CARD_BORDER};
            border-radius: 10px;
            padding: 0 13px;
            height: 42px;
            font-family: inherit;
            outline: none;
          }

          .community-comment-form input:focus {
            border-color: #bfd7ff;
            box-shadow: 0 0 0 4px rgba(47, 128, 237, 0.09);
          }

          .community-comment-form button {
            border: none;
            border-radius: 10px;
            background: ${BRAND_COLOR};
            color: #ffffff;
            font-weight: 900;
            cursor: pointer;
            transition: background-color 0.18s ease, transform 0.18s ease;
          }

          .community-comment-form button:hover {
            background: #1f6fd6;
            transform: translateY(-1px);
          }

          .community-detail-bottom-actions {
            display: flex;
            justify-content: center;
            margin-top: 34px;
            padding-top: 24px;
            border-top: 1px solid ${CARD_BORDER};
          }

          .community-detail-bottom-back {
            min-width: 132px;
            height: 44px;
            border: 1px solid ${CARD_BORDER};
            border-radius: 10px;
            background: #ffffff;
            color: ${TEXT_DARK};
            font-family: inherit;
            font-size: 14px;
            font-weight: 900;
            cursor: pointer;
            transition: background-color 0.18s ease, color 0.18s ease, transform 0.18s ease;
          }

          .community-detail-bottom-back:hover {
            background: #f8fbff;
            color: ${BRAND_COLOR};
            transform: translateY(-1px);
          }

          .image-editor-backdrop {
            z-index: 260;
          }

          .community-crop-modal {
            width: min(560px, 100%);
            max-height: calc(100vh - 40px);
            overflow: auto;
            border-radius: 14px;
            background: #ffffff;
            box-shadow: 0 24px 70px rgba(15, 23, 42, 0.24);
            padding: 24px;
          }

          .community-crop-stage {
            position: relative;
            width: 100%;
            height: 320px;
            border-radius: 12px;
            overflow: hidden;
            background: #0f172a;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 14px;
          }

          .community-crop-stage img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.08s linear;
          }

          .community-crop-frame {
            position: absolute;
            inset: 28px;
            border: 2px solid rgba(255, 255, 255, 0.92);
            box-shadow: 0 0 0 999px rgba(15, 23, 42, 0.38);
            pointer-events: none;
          }

          .community-crop-stage.ratio-1-1 .community-crop-frame {
            width: min(260px, calc(100% - 56px));
            aspect-ratio: 1 / 1;
            inset: 50%;
            transform: translate(-50%, -50%);
          }

          .community-crop-stage.ratio-4-3 .community-crop-frame {
            width: min(360px, calc(100% - 56px));
            aspect-ratio: 4 / 3;
            inset: 50%;
            transform: translate(-50%, -50%);
          }

          .community-crop-stage.ratio-3-4 .community-crop-frame {
            height: min(260px, calc(100% - 56px));
            aspect-ratio: 3 / 4;
            inset: 50%;
            transform: translate(-50%, -50%);
          }

          .community-crop-ratios {
            display: flex;
            gap: 8px;
            margin-bottom: 14px;
          }

          .community-crop-ratios button {
            border: 1px solid ${CARD_BORDER};
            border-radius: 999px;
            background: #ffffff;
            color: ${TEXT_MUTED};
            height: 34px;
            padding: 0 14px;
            font-weight: 900;
            cursor: pointer;
          }

          .community-crop-ratios button.active,
          .community-crop-ratios button:hover {
            border-color: #bfd7ff;
            background: #eaf3ff;
            color: ${BRAND_COLOR};
          }

          .community-crop-control {
            display: grid;
            gap: 8px;
            margin-bottom: 12px;
            color: ${TEXT_DARK};
            font-size: 13px;
            font-weight: 900;
          }

          .community-crop-control input {
            width: 100%;
          }

          @media (max-width: 820px) {
            .community-layout {
              grid-template-columns: 1fr !important;
            }

            .community-sidebar {
              position: static !important;
              grid-template-columns: repeat(2, minmax(0, 1fr));
            }
          }

          @media (max-width: 560px) {
            main {
              padding: 92px 16px 56px !important;
            }

            .community-page-header {
              align-items: flex-start !important;
              flex-direction: column;
            }

            .hot-post-grid,
            .community-review-grid,
            .community-sidebar {
              grid-template-columns: 1fr !important;
            }

            .community-text-row {
              grid-template-columns: 1fr !important;
              padding: 16px 4px;
            }

            .community-row-thumb {
              width: 100%;
              aspect-ratio: 1.8 / 1;
            }
          }
        `}
      </style>
    </main>
  );
}

function getCategoryLabel(categoryId) {
  return (
    communityCategories.find((category) => category.id === categoryId)?.label ||
    "커뮤니티"
  );
}

function cropImage({ src, zoom, offsetX, offsetY, ratio }) {
  const [ratioWidth, ratioHeight] = ratio.split(":").map(Number);
  const canvasWidth = ratio === "3:4" ? 900 : ratio === "1:1" ? 900 : 1200;
  const canvasHeight = Math.round((canvasWidth * ratioHeight) / ratioWidth);

  return new Promise((resolve) => {
    const image = new Image();
    image.onload = () => {
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");

      canvas.width = canvasWidth;
      canvas.height = canvasHeight;

      const baseScale = Math.max(
        canvasWidth / image.naturalWidth,
        canvasHeight / image.naturalHeight
      );
      const scale = baseScale * zoom;
      const drawWidth = image.naturalWidth * scale;
      const drawHeight = image.naturalHeight * scale;
      const maxMoveX = Math.max((drawWidth - canvasWidth) / 2, 0);
      const maxMoveY = Math.max((drawHeight - canvasHeight) / 2, 0);
      const drawX = (canvasWidth - drawWidth) / 2 + (maxMoveX * offsetX) / 35;
      const drawY = (canvasHeight - drawHeight) / 2 + (maxMoveY * offsetY) / 35;

      context.drawImage(image, drawX, drawY, drawWidth, drawHeight);
      resolve(canvas.toDataURL("image/jpeg", 0.9));
    };
    image.src = src;
  });
}

function resizeImageFile(file) {
  return new Promise((resolve) => {
    const reader = new FileReader();

    reader.onload = () => {
      const image = new Image();

      image.onload = () => {
        const maxSize = 1100;
        const scale = Math.min(
          maxSize / image.naturalWidth,
          maxSize / image.naturalHeight,
          1
        );
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");

        canvas.width = Math.round(image.naturalWidth * scale);
        canvas.height = Math.round(image.naturalHeight * scale);
        context.drawImage(image, 0, 0, canvas.width, canvas.height);

        resolve(canvas.toDataURL("image/jpeg", 0.82));
      };

      image.onerror = () => resolve(String(reader.result || ""));
      image.src = String(reader.result || "");
    };

    reader.onerror = () => resolve("");
    reader.readAsDataURL(file);
  });
}

export default CommunityPage;
