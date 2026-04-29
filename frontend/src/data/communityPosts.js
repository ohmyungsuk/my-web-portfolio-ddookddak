import { supabase } from "../supabaseClient.js";

export const COMMUNITY_POSTS_UPDATED = "ddookddak-community-posts-updated";
export const COMMUNITY_STORAGE_KEY = "ddookddak-community-posts";
export const COMMUNITY_DEMO_SEEDED_KEY = "ddookddak-community-demo-seeded-v1";
export const COMMUNITY_TABLE = "community_posts";

export const communityCategories = [
  { id: "all", label: "전체" },
  { id: "reviews", label: "이용후기" },
  { id: "requests", label: "최근 요청 이야기" },
  { id: "tips", label: "작업 팁 모음" },
  { id: "notice", label: "공지사항" },
];

export const communitySectionMeta = [
  { id: "requests", title: "최근 요청 이야기", moreLabel: "더보기" },
  { id: "reviews", title: "이용후기", moreLabel: "더보기" },
  { id: "tips", title: "작업 팁 모음", moreLabel: "더보기" },
  { id: "notice", title: "공지사항", moreLabel: "더보기" },
];

const demoImage = (id) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1100&q=80`;

export const demoCommunityPosts = [
  {
    id: "demo-request-1",
    category: "requests",
    title: "욕실 세면대 아래에서 물이 조금씩 떨어져요",
    content:
      "퇴근하고 보니 세면대 아래 수납장 바닥에 물이 고여 있었습니다. 배수관 연결 부위에서 조금씩 새는 것 같아서 사진을 올리고 점검 가능한 기사님을 찾고 있어요.",
    images: [
      { id: "request-1-a", src: demoImage("photo-1584622650111-993a426fbf0a"), size: "wide" },
      { id: "request-1-b", src: demoImage("photo-1585704032915-c3400ca199e7"), size: "square" },
    ],
    author: "김민서",
    createdAt: "2026-04-29T08:12:00.000Z",
    views: 42,
    likes: 8,
    comments: 2,
  },
  {
    id: "demo-request-2",
    category: "requests",
    title: "현관문 손잡이가 헐거워져서 교체 요청합니다",
    content:
      "문을 열고 닫을 때 손잡이가 흔들리고 잠금도 뻑뻑합니다. 같은 타입으로 교체가 가능한지 궁금합니다.",
    images: [{ id: "request-2-a", src: demoImage("photo-1505693416388-ac5ce068fe85"), size: "wide" }],
    author: "이준호",
    createdAt: "2026-04-29T07:24:00.000Z",
    views: 31,
    likes: 5,
    comments: 1,
  },
  {
    id: "demo-request-3",
    category: "requests",
    title: "주방 콘센트 한 곳만 전원이 안 들어옵니다",
    content:
      "차단기는 내려가지 않았는데 주방 냉장고 옆 콘센트만 전원이 안 들어옵니다. 부분 점검이 필요할 것 같아요.",
    images: [{ id: "request-3-a", src: demoImage("photo-1556911220-bff31c812dba"), size: "wide" }],
    author: "박서연",
    createdAt: "2026-04-29T06:45:00.000Z",
    views: 28,
    likes: 3,
    comments: 0,
  },
  {
    id: "demo-request-4",
    category: "requests",
    title: "에어컨 실내기에서 물이 떨어져요",
    content:
      "에어컨을 켜면 10분 정도 뒤부터 실내기 오른쪽 아래에서 물방울이 떨어집니다. 배수 호스 점검이 필요할 것 같습니다.",
    images: [{ id: "request-4-a", src: demoImage("photo-1600566753190-17f0baa2a6c3"), size: "wide" }],
    author: "최유진",
    createdAt: "2026-04-28T13:20:00.000Z",
    views: 53,
    likes: 11,
    comments: 3,
  },
  {
    id: "demo-request-5",
    category: "requests",
    title: "베란다 방충망이 찢어져서 교체하고 싶어요",
    content:
      "아이 방 베란다 방충망이 오래돼서 아래쪽이 찢어졌습니다. 방충망 교체 견적을 알고 싶습니다.",
    images: [{ id: "request-5-a", src: demoImage("photo-1600607687920-4e2a09cf159d"), size: "wide" }],
    author: "정하늘",
    createdAt: "2026-04-28T10:05:00.000Z",
    views: 19,
    likes: 2,
    comments: 1,
  },
  {
    id: "demo-review-1",
    category: "reviews",
    title: "누수 위치를 바로 찾아주셔서 안심했어요",
    content:
      "사진을 보고 필요한 부품을 미리 챙겨와 주셨어요. 설명도 차근차근 해주시고 작업 후 물이 새지 않는지 같이 확인해주셔서 좋았습니다.",
    images: [{ id: "review-1-a", src: demoImage("photo-1600566752355-35792bedcfea"), size: "wide" }],
    author: "문지아",
    createdAt: "2026-04-28T05:10:00.000Z",
    views: 81,
    likes: 14,
    comments: 4,
  },
  {
    id: "demo-review-2",
    category: "reviews",
    title: "현관문 수리 후 문 닫힘이 훨씬 부드러워졌어요",
    content:
      "필요한 부분만 수리해주셔서 비용도 부담스럽지 않았고, 문 닫히는 소리도 훨씬 줄었습니다.",
    images: [{ id: "review-2-a", src: demoImage("photo-1600210492486-724fe5c67fb0"), size: "wide" }],
    author: "오승민",
    createdAt: "2026-04-27T12:30:00.000Z",
    views: 64,
    likes: 9,
    comments: 2,
  },
  {
    id: "demo-review-3",
    category: "reviews",
    title: "에어컨 물샘 해결하고 여름 준비 끝냈습니다",
    content:
      "배수 호스 막힘이 원인이었고 청소 후 물 빠지는 상태까지 확인해주셨습니다. 관리 방법도 알려주셔서 만족합니다.",
    images: [{ id: "review-3-a", src: demoImage("photo-1581578731548-c64695cc6952"), size: "wide" }],
    author: "한지훈",
    createdAt: "2026-04-27T03:15:00.000Z",
    views: 73,
    likes: 13,
    comments: 3,
  },
  {
    id: "demo-review-4",
    category: "reviews",
    title: "콘센트 점검을 꼼꼼하게 해주셨어요",
    content:
      "전기 문제라 걱정이 컸는데 사용하면 안 되는 멀티탭 상태까지 봐주셨습니다. 설명을 듣고 나니 마음이 놓였습니다.",
    images: [{ id: "review-4-a", src: demoImage("photo-1560185127-6ed189bf02f4"), size: "wide" }],
    author: "서다은",
    createdAt: "2026-04-26T09:40:00.000Z",
    views: 58,
    likes: 7,
    comments: 1,
  },
  {
    id: "demo-review-5",
    category: "reviews",
    title: "방충망 교체가 생각보다 빨리 끝났어요",
    content:
      "방문 전에 준비를 잘 해오셨고 교체 후 창문 여닫는 것도 확인해주셔서 바로 사용할 수 있었어요.",
    images: [{ id: "review-5-a", src: demoImage("photo-1600566752229-250ed79470d4"), size: "wide" }],
    author: "윤소라",
    createdAt: "2026-04-26T02:00:00.000Z",
    views: 49,
    likes: 6,
    comments: 0,
  },
  {
    id: "demo-tip-1",
    category: "tips",
    title: "누수 요청 전 먼저 잠가야 할 밸브 위치",
    content:
      "세면대나 싱크대 아래에서 물이 샐 때는 수납장 안쪽의 작은 밸브를 시계 방향으로 잠가보세요. 물이 계속 나오면 계량기함의 메인 밸브를 잠그고 사진을 찍어 요청하면 확인이 빠릅니다.",
    images: [{ id: "tip-1-a", src: demoImage("photo-1585704032915-c3400ca199e7"), size: "wide" }],
    author: "뚝딱 운영팀",
    createdAt: "2026-04-25T08:00:00.000Z",
    views: 124,
    likes: 21,
    comments: 5,
  },
  {
    id: "demo-tip-2",
    category: "tips",
    title: "전기 문제 사진은 차단기함도 함께 찍어주세요",
    content:
      "콘센트나 조명 문제가 있을 때는 문제 부위 사진뿐 아니라 차단기함 전체 사진도 함께 올리면 좋아요.",
    images: [{ id: "tip-2-a", src: demoImage("photo-1621905252507-b35492cc74b4"), size: "wide" }],
    author: "뚝딱 운영팀",
    createdAt: "2026-04-25T04:30:00.000Z",
    views: 96,
    likes: 18,
    comments: 2,
  },
  {
    id: "demo-tip-3",
    category: "tips",
    title: "에어컨 물샘을 줄이는 필터 관리 방법",
    content:
      "필터에 먼지가 많이 쌓이면 냉방 효율이 떨어지고 물맺힘이 심해질 수 있습니다. 2주에 한 번 필터를 청소해주세요.",
    images: [{ id: "tip-3-a", src: demoImage("photo-1627905646269-7f034dcc5738"), size: "wide" }],
    author: "뚝딱 운영팀",
    createdAt: "2026-04-24T07:50:00.000Z",
    views: 132,
    likes: 24,
    comments: 6,
  },
  {
    id: "demo-tip-4",
    category: "tips",
    title: "문이 뻑뻑할 때 바로 힘으로 밀지 마세요",
    content:
      "현관문이나 방문이 뻑뻑하면 경첩, 손잡이, 문틀 중 한 곳이 틀어진 경우가 많습니다. 증상을 영상으로 남겨두면 좋습니다.",
    images: [{ id: "tip-4-a", src: demoImage("photo-1513694203232-719a280e022f"), size: "wide" }],
    author: "뚝딱 운영팀",
    createdAt: "2026-04-24T01:20:00.000Z",
    views: 87,
    likes: 10,
    comments: 1,
  },
  {
    id: "demo-tip-5",
    category: "tips",
    title: "방충망 교체 전 치수를 대략 재는 법",
    content:
      "정확한 실측은 작업자가 확인하지만, 요청 전 창틀 안쪽 가로와 세로 길이를 대략 재두면 상담이 쉬워집니다.",
    images: [{ id: "tip-5-a", src: demoImage("photo-1494526585095-c41746248156"), size: "wide" }],
    author: "뚝딱 운영팀",
    createdAt: "2026-04-23T06:15:00.000Z",
    views: 75,
    likes: 8,
    comments: 0,
  },
  ...Array.from({ length: 5 }, (_, index) => ({
    id: `demo-notice-${index + 1}`,
    category: "notice",
    title:
      [
        "커뮤니티 테스트 게시글이 추가되었습니다",
        "사진 첨부 글은 메인 화면에도 표시됩니다",
        "댓글과 조회수는 테스트용으로 동작합니다",
        "카테고리별 게시판 화면을 점검해주세요",
        "테스트 데이터는 추후 제거할 수 있습니다",
      ][index],
    content:
      "현재 커뮤니티는 화면 테스트를 위해 브라우저 localStorage에 저장됩니다. 이후 백엔드 게시판 API와 연결할 예정입니다.",
    images: [],
    author: "뚝딱 운영팀",
    createdAt: `2026-04-${29 - index}T09:00:00.000Z`,
    views: 36 - index * 3,
    likes: 0,
    comments: 0,
  })),
];

export const communitySections = communitySectionMeta.map((section) => ({
  ...section,
  posts: [],
}));

export const normalizeImage = (image, index = 0) => {
  if (!image) return null;
  if (typeof image === "string") {
    return { id: `image-${Date.now()}-${index}`, src: image, size: "wide" };
  }
  return {
    id: image.id || `image-${Date.now()}-${index}`,
    src: image.src || image.url || "",
    size: image.size || "wide",
  };
};

export const normalizePost = (post) => {
  const legacyImage = post.image ? [post.image] : [];
  const rawImages = Array.isArray(post.images) ? post.images : legacyImage;
  const images = rawImages
    .map((image, index) => normalizeImage(image, index))
    .filter((image) => image?.src);
  const commentList = Array.isArray(post.commentList) ? post.commentList : [];

  return {
    ...post,
    images,
    image: images[0]?.src || "",
    excerpt: post.excerpt || post.content || "",
    likes: Number(post.likes || 0),
    liked: Boolean(post.liked),
    comments: countComments(commentList) || Number(post.comments || 0),
    commentList: commentList.map(normalizeComment),
  };
};

export const normalizeComment = (comment) => ({
  ...comment,
  id: comment.id || `comment-${Date.now()}`,
  author: comment.author || "뚝딱 회원",
  message: comment.message || "",
  createdAt: comment.createdAt || new Date().toISOString(),
  replies: Array.isArray(comment.replies)
    ? comment.replies.map((reply) => ({
        ...reply,
        id: reply.id || `reply-${Date.now()}`,
        author: reply.author || "뚝딱 회원",
        message: reply.message || "",
        createdAt: reply.createdAt || new Date().toISOString(),
      }))
    : [],
});

export const countComments = (comments = []) =>
  comments.reduce((total, comment) => total + 1 + (comment.replies?.length || 0), 0);

const toDatabasePost = (post) => ({
  id: post.id,
  category: post.category,
  title: post.title,
  content: post.content,
  excerpt: post.excerpt || post.content || "",
  images: post.images || [],
  image: post.image || post.images?.[0]?.src || "",
  author: post.author || "뚝딱 회원",
  views: Number(post.views || 0),
  likes: Number(post.likes || 0),
  liked: Boolean(post.liked),
  comments: Number(post.comments || 0),
  comment_list: post.commentList || [],
  created_at: post.createdAt || new Date().toISOString(),
  updated_at: new Date().toISOString(),
});

const fromDatabasePost = (row) =>
  normalizePost({
    id: row.id,
    category: row.category,
    title: row.title,
    content: row.content,
    excerpt: row.excerpt,
    images: row.images || [],
    image: row.image || "",
    author: row.author,
    views: row.views,
    likes: row.likes,
    liked: row.liked,
    comments: row.comments,
    commentList: row.comment_list || [],
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  });

const isMissingCommunityTable = (error) =>
  ["42P01", "PGRST116", "PGRST204"].includes(error?.code);

const persistCommunityPostToSupabase = async (post) => {
  try {
    const { error } = await supabase
      .from(COMMUNITY_TABLE)
      .upsert(toDatabasePost(normalizePost(post)), { onConflict: "id" });

    if (error) throw error;
    return true;
  } catch (error) {
    if (!isMissingCommunityTable(error)) {
      console.error("커뮤니티 글 Supabase 저장 실패:", error);
    }
    return false;
  }
};

export const syncCommunityPost = (post) => persistCommunityPostToSupabase(post);

const mergeDemoPosts = (posts) => {
  const normalizedPosts = posts.map(normalizePost);
  const existingIds = new Set(normalizedPosts.map((post) => post.id));
  const missingDemoPosts = demoCommunityPosts.filter(
    (post) => !existingIds.has(post.id)
  ).map(normalizePost);

  return [...missingDemoPosts, ...normalizedPosts];
};

export const getStoredCommunityPosts = () => {
  if (typeof window === "undefined") return [];

  try {
    const rawPosts = window.localStorage.getItem(COMMUNITY_STORAGE_KEY);
    const parsedPosts = rawPosts ? JSON.parse(rawPosts) : [];
    const currentPosts = Array.isArray(parsedPosts) ? parsedPosts : [];
    const isSeeded = window.localStorage.getItem(COMMUNITY_DEMO_SEEDED_KEY);

    if (!isSeeded) {
      const seededPosts = mergeDemoPosts(currentPosts);
      window.localStorage.setItem(COMMUNITY_STORAGE_KEY, JSON.stringify(seededPosts));
      window.localStorage.setItem(COMMUNITY_DEMO_SEEDED_KEY, "true");
      return seededPosts;
    }

    return currentPosts.map(normalizePost);
  } catch (error) {
    console.error("커뮤니티 글 조회 실패:", error);
    return [];
  }
};

export const getCommunityPosts = async () => {
  try {
    const { data, error } = await supabase
      .from(COMMUNITY_TABLE)
      .select(
        "id, category, title, content, excerpt, images, image, author, views, likes, liked, comments, comment_list, created_at, updated_at"
      )
      .order("created_at", { ascending: false });

    if (error) throw error;

    const remotePosts = Array.isArray(data) ? data.map(fromDatabasePost) : [];

    if (remotePosts.length > 0) {
      saveCommunityPosts(remotePosts, { syncRemote: false });
      return remotePosts;
    }
  } catch (error) {
    if (!isMissingCommunityTable(error)) {
      console.error("커뮤니티 글 Supabase 조회 실패:", error);
    }
  }

  const localPosts = getStoredCommunityPosts();
  localPosts.forEach((post) => persistCommunityPostToSupabase(post));
  return localPosts;
};

export const saveCommunityPosts = (posts, options = {}) => {
  if (typeof window === "undefined") return false;

  try {
    window.localStorage.setItem(
      COMMUNITY_STORAGE_KEY,
      JSON.stringify(posts.map(normalizePost))
    );
    window.dispatchEvent(new Event(COMMUNITY_POSTS_UPDATED));
    return true;
  } catch (error) {
    console.error("커뮤니티 글 저장 실패:", error);
    return false;
  }
};

export const createCommunityPost = ({
  category,
  title,
  content,
  images = [],
  image = "",
  author = "뚝딱 회원",
}) => {
  const normalizedImages = (images.length ? images : image ? [image] : [])
    .map((item, index) => normalizeImage(item, index))
    .filter((item) => item?.src);
  const post = normalizePost({
    id: `community-${Date.now()}`,
    category,
    title,
    content,
    excerpt: content,
    images: normalizedImages,
    author,
    createdAt: new Date().toISOString(),
    views: 0,
    likes: 0,
    liked: false,
    comments: 0,
    commentList: [],
  });

  const nextPosts = [post, ...getStoredCommunityPosts()];
  saveCommunityPosts(nextPosts);
  persistCommunityPostToSupabase(post);

  return post;
};

export const updateCommunityPost = (postId, updater) => {
  const nextPosts = getStoredCommunityPosts().map((post) =>
    post.id === postId ? normalizePost(updater(post)) : post
  );

  saveCommunityPosts(nextPosts);
  const updatedPost = nextPosts.find((post) => post.id === postId) || null;
  if (updatedPost) persistCommunityPostToSupabase(updatedPost);
  return updatedPost;
};

export const getCommunitySections = (posts = getStoredCommunityPosts()) =>
  communitySectionMeta.map((section) => ({
    ...section,
    posts: posts.filter((post) => post.category === section.id),
  }));

export const getCommunityPreviewSections = (posts = getStoredCommunityPosts()) =>
  getCommunitySections(posts)
    .filter((section) => section.id !== "notice")
    .map((section) => ({
      ...section,
      posts: section.posts.slice(0, 4),
    }));

export const formatCommunityTime = (value) => {
  if (!value) return "방금 전";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "방금 전";

  const diffMinutes = Math.floor((Date.now() - date.getTime()) / 60000);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMinutes < 1) return "방금 전";
  if (diffMinutes < 60) return `${diffMinutes}분 전`;
  if (diffHours < 24) return `${diffHours}시간 전`;
  if (diffDays < 7) return `${diffDays}일 전`;

  return `${date.getMonth() + 1}.${date.getDate()}`;
};
