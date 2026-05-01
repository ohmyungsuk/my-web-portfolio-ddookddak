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

const screenTime = (hours, minutes = 0) =>
  new Date(Date.now() - 1000 * 60 * (hours * 60 + minutes)).toISOString();

const screenProfileImages = [
  "photo-1494790108377-be9c29b29330",
  "photo-1507003211169-0a1dd7228f2d",
  "photo-1544005313-94ddf0286df2",
  "photo-1438761681033-6461ffad8d80",
  "photo-1500648767791-00dcc994a43e",
  "photo-1517841905240-472988babdf9",
  "photo-1506794778202-cad84cf45f1d",
  "photo-1527980965255-d3b416303d12",
];

const makeScreenPost = (item, index) => ({
  id: item.id,
  category: item.category,
  title: item.title,
  content: item.content,
  excerpt: item.excerpt || item.content,
  images: item.image
    ? [{ id: `${item.id}-image`, src: demoImage(item.image), size: "wide" }]
    : [],
  author: item.author,
  authorAvatar: item.authorAvatar === ""
    ? ""
    : demoImage(item.authorAvatar || screenProfileImages[index % screenProfileImages.length]),
  createdAt: screenTime(item.hours || index + 1, item.minutes || 0),
  views: item.views ?? 20 + index * 7,
  likes: item.likes ?? Math.floor(index / 2),
  comments: item.comments ?? index % 3,
  commentList: [],
});

const screenOnlyCommunityPosts = [
  {
    id: "screen-request-1",
    category: "requests",
    title: "싱크대 밑에서 물이 조금씩 새요",
    content:
      "어제 저녁부터 싱크대 아래쪽에 물기가 계속 생겨요. 많이 새는 건 아닌데 장판 쪽으로 번질까봐 일단 밸브는 잠가둔 상태입니다. 사진처럼 배관 연결 부위에서 맺히는 것 같아요. 오늘 저녁이나 내일 오전에 봐주실 수 있는 분 찾습니다.",
    excerpt:
      "어제 저녁부터 싱크대 아래쪽에 물기가 계속 생겨요. 많이 새는 건 아닌데 장판 쪽으로 번질까봐...",
    images: [
      { id: "screen-request-1-a", src: demoImage("photo-1585704032915-c3400ca199e7"), size: "wide" },
    ],
    author: "김나은",
    authorAvatar: demoImage("photo-1494790108377-be9c29b29330"),
    createdAt: new Date(Date.now() - 1000 * 60 * 27).toISOString(),
    views: 18,
    likes: 1,
    comments: 2,
    commentList: [
      {
        id: "screen-comment-1",
        author: "서민재",
        authorAvatar: demoImage("photo-1500648767791-00dcc994a43e"),
        message: "사진상으론 트랩 쪽일 수도 있어보여요. 물 더 틀지 말고 기다리시는 게 좋을듯요",
        createdAt: new Date(Date.now() - 1000 * 60 * 12).toISOString(),
        replies: [],
      },
    ],
  },
  {
    id: "screen-request-2",
    category: "requests",
    title: "방문 손잡이가 헛돌아요",
    content:
      "아이방 문 손잡이가 갑자기 헛돌아서 문이 잘 안 열립니다. 완전히 잠긴 건 아닌데 몇 번 돌려야 열려요. 손잡이만 교체하면 되는건지 문 쪽도 봐야하는지 모르겠네요. 급한건 아니고 주말 전까지만 가능하면 좋겠습니다.",
    excerpt:
      "아이방 문 손잡이가 갑자기 헛돌아서 문이 잘 안 열립니다. 손잡이만 교체하면 되는건지...",
    images: [
      { id: "screen-request-2-a", src: demoImage("photo-1505693416388-ac5ce068fe85"), size: "wide" },
    ],
    author: "오명석",
    authorAvatar: demoImage("photo-1507003211169-0a1dd7228f2d"),
    createdAt: new Date(Date.now() - 1000 * 60 * 76).toISOString(),
    views: 31,
    likes: 0,
    comments: 1,
    commentList: [],
  },
  {
    id: "screen-review-1",
    category: "reviews",
    title: "누수 위치 바로 찾아주셔서 마음 놓였어요",
    content:
      "처음엔 어디서 새는지 몰라서 바닥만 계속 닦고 있었는데 사진 보내드리고 설명 들으니까 대충 감이 오더라구요. 오셔서 확인도 빨리 해주시고, 괜히 큰 공사로 안 넘어가게 잡아주셔서 다행이었어요. 설명도 편하게 해주셔서 좋았습니다.",
    excerpt:
      "처음엔 어디서 새는지 몰라서 바닥만 계속 닦고 있었는데 사진 보내드리고 설명 들으니까...",
    images: [
      { id: "screen-review-1-a", src: demoImage("photo-1600566752355-35792bedcfea"), size: "wide" },
    ],
    author: "문지영",
    authorAvatar: demoImage("photo-1544005313-94ddf0286df2"),
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(),
    views: 64,
    likes: 5,
    comments: 2,
    commentList: [],
  },
  {
    id: "screen-review-2",
    category: "reviews",
    title: "현관문 닫히는 소리가 훨씬 줄었네요",
    content:
      "문 닫힐 때마다 꽝 소리가 나서 밤에 신경 쓰였는데 조절하고 나니까 훨씬 낫습니다. 오래된 문이라 교체까지 생각했는데 일단 수리로 해결돼서 비용도 덜 들었어요. 이런 건 빨리 부를걸 그랬네요 ㅎㅎ",
    excerpt:
      "문 닫힐 때마다 꽝 소리가 나서 밤에 신경 쓰였는데 조절하고 나니까 훨씬 낫습니다...",
    images: [
      { id: "screen-review-2-a", src: demoImage("photo-1600210492486-724fe5c67fb0"), size: "wide" },
    ],
    author: "이수민",
    authorAvatar: demoImage("photo-1438761681033-6461ffad8d80"),
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 7).toISOString(),
    views: 47,
    likes: 3,
    comments: 0,
    commentList: [],
  },
  {
    id: "screen-tip-1",
    category: "tips",
    title: "누수 요청 전 먼저 잠가야 할 밸브 위치",
    content:
      "세면대나 싱크대 아래에서 물이 샐 때는 안쪽 작은 밸브를 시계 방향으로 잠가보세요. 그래도 계속 나오면 계량기함 쪽 메인 밸브까지 잠그고 사진을 남겨두면 확인이 빠릅니다. 급하게 닦기만 하다보면 어디서 새는지 놓치는 경우가 많아요.",
    excerpt:
      "세면대나 싱크대 아래에서 물이 샐 때는 안쪽 작은 밸브를 시계 방향으로 잠가보세요...",
    images: [
      { id: "screen-tip-1-a", src: demoImage("photo-1584622650111-993a426fbf0a"), size: "wide" },
    ],
    author: "뚝딱 운영팀",
    authorAvatar: "",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
    views: 92,
    likes: 9,
    comments: 1,
    commentList: [],
  },
  {
    id: "screen-tip-2",
    category: "tips",
    title: "전기 문제는 차단기 사진도 같이 올리면 좋아요",
    content:
      "콘센트나 조명이 안 될 때는 문제 부위만 찍는 것보다 차단기함 사진도 같이 있으면 확인이 빨라요. 어느 구역만 내려갔는지, 전체가 문제인지 대략 볼 수 있습니다. 무리해서 직접 만지진 말고 사진만 남겨주세요.",
    excerpt:
      "콘센트나 조명이 안 될 때는 문제 부위만 찍는 것보다 차단기함 사진도 같이 있으면 확인이 빨라요...",
    images: [
      { id: "screen-tip-2-a", src: demoImage("photo-1621905252507-b35492cc74b4"), size: "wide" },
    ],
    author: "뚝딱 운영팀",
    authorAvatar: "",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 20).toISOString(),
    views: 76,
    likes: 7,
    comments: 0,
    commentList: [],
  },
  ...[
    {
      id: "screen-request-3",
      category: "requests",
      title: "베란다 방충망이 찢어졌는데 교체 가능할까요",
      content:
        "강아지가 긁어서 베란다 방충망 아래쪽이 좀 찢어졌어요. 창문 전체를 바꿔야 하는건지 방충망만 교체되는지 궁금합니다. 사진으로는 잘 안 보일 수도 있는데 한쪽 모서리도 들떠있어요.",
      image: "photo-1600607687920-4e2a09cf159d",
      author: "정하린",
      hours: 2,
      minutes: 10,
      views: 24,
      likes: 1,
      comments: 0,
    },
    {
      id: "screen-request-4",
      category: "requests",
      title: "욕실 환풍기 소리가 너무 커졌어요",
      content:
        "며칠 전부터 욕실 환풍기 켜면 드르륵 소리가 납니다. 처음엔 괜찮다가 1분쯤 지나면 더 커져요. 오래된 아파트라 부품이 있는지도 모르겠네요. 교체 말고 수리도 되는지 봐주세요.",
      image: "photo-1600566753190-17f0baa2a6c3",
      author: "박선우",
      hours: 3,
      views: 41,
      likes: 2,
      comments: 1,
    },
    {
      id: "screen-request-5",
      category: "requests",
      title: "현관 센서등이 밤새 켜졌다 꺼졌다 해요",
      content:
        "사람이 없는데도 센서등이 계속 반응합니다. 벌레 때문인가 싶어서 닦아봤는데 그대로네요. 센서만 바꾸면 되는건지 조명 전체 교체인지 궁금합니다.",
      image: "photo-1560185127-6ed189bf02f4",
      author: "최유나",
      hours: 5,
      minutes: 30,
      views: 37,
      likes: 0,
      comments: 2,
    },
    {
      id: "screen-request-6",
      category: "requests",
      title: "주방 콘센트 하나만 전원이 안 들어와요",
      content:
        "다른 콘센트는 다 되는데 정수기 꽂던 자리만 전기가 안 들어옵니다. 차단기는 내려간 게 없어요. 혹시 안쪽 배선 문제일까요? 가능하면 이번 주 안에 확인받고 싶습니다.",
      image: "photo-1556911220-bff31c812dba",
      author: "윤도현",
      hours: 8,
      views: 58,
      likes: 3,
      comments: 1,
    },
    {
      id: "screen-request-7",
      category: "requests",
      title: "창문 잠금장치가 헐거워요",
      content:
        "창문 닫고 잠가도 살짝 흔들립니다. 바람 불면 덜컹거려서 잠을 잘 못 자겠어요. 부속만 교체 가능한지, 창틀도 봐야하는지 모르겠네요.",
      image: "photo-1513694203232-719a280e022f",
      author: "한서윤",
      hours: 10,
      views: 29,
      likes: 1,
      comments: 0,
    },
    {
      id: "screen-request-8",
      category: "requests",
      title: "에어컨 배수호스 쪽에서 물이 떨어져요",
      content:
        "냉방 켜면 베란다 쪽 호스에서 물이 조금씩 떨어집니다. 실내로 새는 건 아직 아닌데 아래집에 피해 갈까봐 걱정돼요. 호스만 정리하면 되는 정도일까요.",
      image: "photo-1581578731548-c64695cc6952",
      author: "강민수",
      hours: 15,
      minutes: 20,
      views: 62,
      likes: 4,
      comments: 2,
    },
    {
      id: "screen-request-9",
      category: "requests",
      title: "붙박이장 문이 내려앉은 것 같아요",
      content:
        "문이 바닥에 살짝 닿아서 열고 닫을 때 긁혀요. 레일 문제인지 경첩 문제인지 모르겠습니다. 큰 작업 아니면 퇴근 후에도 가능할까요?",
      image: "photo-1600566752229-250ed79470d4",
      author: "이지훈",
      hours: 19,
      views: 33,
      likes: 2,
      comments: 1,
    },
    {
      id: "screen-request-10",
      category: "requests",
      title: "세탁기 급수 호스 연결부가 젖어있어요",
      content:
        "세탁 끝나고 보니까 수도꼭지랑 호스 연결되는 부분이 젖어있더라구요. 많이 새진 않는데 물때도 보이고 오래된 것 같아서 확인 부탁드려요.",
      image: "photo-1627905646269-7f034dcc5738",
      author: "배수진",
      hours: 23,
      views: 46,
      likes: 1,
      comments: 0,
    },
  ].map(makeScreenPost),
  ...[
    {
      id: "screen-review-3",
      category: "reviews",
      title: "방충망 교체 생각보다 빨리 끝났어요",
      content:
        "처음엔 창틀까지 다 손봐야 하나 했는데 방충망만 깔끔하게 갈아주셨어요. 작업 중에 설명도 해주시고 뒷정리도 해주셔서 편했습니다. 다음엔 미리 부를게요.",
      image: "photo-1600607687920-4e2a09cf159d",
      author: "정하린",
      hours: 6,
      views: 52,
      likes: 4,
      comments: 1,
    },
    {
      id: "screen-review-4",
      category: "reviews",
      title: "콘센트 문제 바로 잡아주셨어요",
      content:
        "주방 콘센트가 갑자기 안 돼서 걱정했는데 원인 금방 찾으셨어요. 괜히 멀티탭 문제인가 계속 바꿔봤네요. 설명 듣고 나니 왜 그랬는지 이해됐습니다.",
      image: "photo-1621905252507-b35492cc74b4",
      author: "윤도현",
      hours: 9,
      views: 73,
      likes: 6,
      comments: 2,
    },
    {
      id: "screen-review-5",
      category: "reviews",
      title: "욕실 환풍기 소리 잡혔습니다",
      content:
        "교체해야 하나 했는데 일단 수리로 해결됐어요. 소리가 너무 커서 신경 쓰였는데 지금은 조용합니다. 부품 상태도 같이 봐주셔서 좋았어요.",
      image: "photo-1600566753190-17f0baa2a6c3",
      author: "박선우",
      hours: 14,
      views: 39,
      likes: 3,
      comments: 0,
    },
    {
      id: "screen-review-6",
      category: "reviews",
      title: "붙박이장 문이 부드럽게 닫혀요",
      content:
        "문 닫을 때마다 긁히는 소리가 났는데 조정하고 나니까 훨씬 낫네요. 새로 맞춰야 하나 고민했는데 비용 덜 들어서 다행입니다.",
      image: "photo-1494526585095-c41746248156",
      author: "이지훈",
      hours: 18,
      views: 28,
      likes: 2,
      comments: 1,
    },
    {
      id: "screen-review-7",
      category: "reviews",
      title: "세탁기 호스 누수 확인받았어요",
      content:
        "작게 새는 거라 그냥 둘까 했는데 봐주시길 잘했네요. 고무 패킹 쪽이 오래됐다고 하셔서 교체했습니다. 작업은 생각보다 금방 끝났어요.",
      image: "photo-1627905646269-7f034dcc5738",
      author: "배수진",
      hours: 26,
      views: 44,
      likes: 3,
      comments: 1,
    },
    {
      id: "screen-review-8",
      category: "reviews",
      title: "센서등 오작동이 사라졌네요",
      content:
        "밤마다 켜졌다 꺼졌다 해서 은근 스트레스였는데 센서 조정하고 괜찮아졌습니다. 교체까지 안 가서 좋았고, 체크 방법도 알려주셨어요.",
      image: "photo-1513694203232-719a280e022f",
      author: "최유나",
      hours: 31,
      views: 55,
      likes: 5,
      comments: 0,
    },
    {
      id: "screen-review-9",
      category: "reviews",
      title: "창문 흔들림 잡아주셨어요",
      content:
        "바람 불 때마다 덜컹거렸는데 고정하고 나니 조용합니다. 작은 문제라 부르기 애매했는데 빨리 처리돼서 만족해요.",
      image: "photo-1600210492486-724fe5c67fb0",
      author: "한서윤",
      hours: 36,
      views: 61,
      likes: 4,
      comments: 2,
    },
    {
      id: "screen-review-10",
      category: "reviews",
      title: "에어컨 물 떨어지는 거 해결됐습니다",
      content:
        "배수호스 위치가 문제였다고 하시더라구요. 여름 전에 미리 봐서 다행입니다. 다음부터는 물 맺히면 바로 사진 찍어두려고요.",
      image: "photo-1581578731548-c64695cc6952",
      author: "강민수",
      hours: 42,
      views: 80,
      likes: 7,
      comments: 3,
    },
  ].map(makeScreenPost),
  ...[
    {
      id: "screen-tip-3",
      category: "tips",
      title: "방충망 찢어졌을 때 치수 재는 법",
      content:
        "방충망은 정확한 치수는 작업자가 다시 확인하지만, 문의할 때는 창틀 안쪽 가로/세로 정도만 적어도 상담이 쉬워요. 찢어진 부분만 가까이 찍기보다 전체 창 사진도 같이 올리면 좋습니다.",
      image: "photo-1600607687920-4e2a09cf159d",
      author: "뚝딱 운영팀",
      authorAvatar: "",
      hours: 4,
      views: 88,
      likes: 8,
      comments: 1,
    },
    {
      id: "screen-tip-4",
      category: "tips",
      title: "문 손잡이가 헛돌 때는 억지로 힘주지 마세요",
      content:
        "손잡이가 헛돌 때 계속 힘줘서 돌리면 안쪽 부속이 더 망가질 수 있어요. 문이 열리는 상태라면 열어둔 채로 사진을 찍어두는 게 제일 좋습니다.",
      image: "photo-1505693416388-ac5ce068fe85",
      author: "뚝딱 운영팀",
      authorAvatar: "",
      hours: 11,
      views: 70,
      likes: 6,
      comments: 0,
    },
    {
      id: "screen-tip-5",
      category: "tips",
      title: "환풍기 소음은 영상으로 남기면 좋아요",
      content:
        "환풍기나 에어컨처럼 소리가 문제인 경우 사진보다 짧은 영상이 더 도움이 됩니다. 켠 직후, 소리가 커지는 시점이 다르면 둘 다 남겨두면 확인이 빨라요.",
      image: "photo-1600566753190-17f0baa2a6c3",
      author: "뚝딱 운영팀",
      authorAvatar: "",
      hours: 16,
      views: 94,
      likes: 9,
      comments: 2,
    },
    {
      id: "screen-tip-6",
      category: "tips",
      title: "콘센트 불량 의심되면 먼저 멀티탭을 바꿔보세요",
      content:
        "전기가 안 들어올 때는 기기 문제인지 콘센트 문제인지 헷갈릴 수 있어요. 다른 기기를 꽂아보고, 가능하면 차단기함 사진도 같이 올려주세요.",
      image: "photo-1621905252507-b35492cc74b4",
      author: "뚝딱 운영팀",
      authorAvatar: "",
      hours: 22,
      views: 102,
      likes: 10,
      comments: 1,
    },
    {
      id: "screen-tip-7",
      category: "tips",
      title: "창문 덜컹거림은 잠금장치 사진도 필요해요",
      content:
        "창문이 흔들리는 문제는 레일만 봐서는 원인을 알기 어려울 때가 있어요. 잠금장치, 레일, 창틀 모서리 사진을 같이 올려두면 상담이 더 정확해집니다.",
      image: "photo-1513694203232-719a280e022f",
      author: "뚝딱 운영팀",
      authorAvatar: "",
      hours: 29,
      views: 66,
      likes: 5,
      comments: 0,
    },
    {
      id: "screen-tip-8",
      category: "tips",
      title: "세탁기 주변 누수는 바닥 사진도 같이 찍어두세요",
      content:
        "호스 연결부만 찍으면 물이 어디로 흐르는지 놓칠 수 있습니다. 연결부, 바닥 물 고인 곳, 수도꼭지 전체를 같이 찍어두면 확인이 쉬워요.",
      image: "photo-1627905646269-7f034dcc5738",
      author: "뚝딱 운영팀",
      authorAvatar: "",
      hours: 34,
      views: 85,
      likes: 7,
      comments: 2,
    },
    {
      id: "screen-tip-9",
      category: "tips",
      title: "붙박이장 문이 내려앉으면 바로 닫지 말기",
      content:
        "문이 바닥에 닿는 상태로 계속 여닫으면 바닥이나 문짝이 같이 상할 수 있어요. 가능하면 문을 살짝 열어둔 상태로 두고, 경첩 쪽 사진을 찍어주세요.",
      image: "photo-1494526585095-c41746248156",
      author: "뚝딱 운영팀",
      authorAvatar: "",
      hours: 40,
      views: 59,
      likes: 4,
      comments: 0,
    },
    {
      id: "screen-tip-10",
      category: "tips",
      title: "요청 사진은 가까운 컷보다 전체 컷 먼저",
      content:
        "고장 부위를 가까이 찍은 사진도 필요하지만, 전체 구조가 보이는 사진이 먼저 있으면 좋아요. 어디에 붙어있는지 보여야 작업 범위를 빨리 판단할 수 있습니다.",
      image: "photo-1600566752355-35792bedcfea",
      author: "뚝딱 운영팀",
      authorAvatar: "",
      hours: 48,
      views: 117,
      likes: 12,
      comments: 3,
    },
  ].map(makeScreenPost),
  ...[
    {
      id: "screen-notice-1",
      category: "notice",
      title: "커뮤니티 사진 첨부 안내",
      content:
        "요청이나 후기를 남길 때 사진을 함께 올리면 상황을 더 빨리 이해할 수 있어요. 개인정보가 보이는 부분은 가려서 올려주세요.",
      author: "뚝딱 운영팀",
      authorAvatar: "",
      hours: 3,
      views: 42,
      likes: 0,
      comments: 0,
    },
    {
      id: "screen-notice-2",
      category: "notice",
      title: "댓글 이용 시 서로 예의를 지켜주세요",
      content:
        "작업 조언이나 경험 공유는 환영하지만, 비방이나 개인정보 노출은 숨김 처리될 수 있습니다.",
      author: "뚝딱 운영팀",
      authorAvatar: "",
      hours: 12,
      views: 38,
      likes: 0,
      comments: 0,
    },
    {
      id: "screen-notice-3",
      category: "notice",
      title: "작업 전 현장 사진을 남겨두면 좋아요",
      content:
        "작업 전후 상태를 비교할 수 있도록 사진을 남겨두면 상담과 확인이 더 편해집니다.",
      author: "뚝딱 운영팀",
      authorAvatar: "",
      hours: 20,
      views: 33,
      likes: 0,
      comments: 0,
    },
    {
      id: "screen-notice-4",
      category: "notice",
      title: "긴급 누수는 먼저 밸브를 잠가주세요",
      content:
        "물이 계속 새는 경우 접수 전에 가능한 범위에서 밸브를 잠그고, 물이 번지는 위치를 사진으로 남겨주세요.",
      author: "뚝딱 운영팀",
      authorAvatar: "",
      hours: 30,
      views: 51,
      likes: 0,
      comments: 0,
    },
    {
      id: "screen-notice-5",
      category: "notice",
      title: "커뮤니티 신고 기능 안내",
      content:
        "부적절한 게시글은 상세 화면의 메뉴에서 신고할 수 있습니다. 확인 후 필요한 조치를 진행할 예정입니다.",
      author: "뚝딱 운영팀",
      authorAvatar: "",
      hours: 44,
      views: 27,
      likes: 0,
      comments: 0,
    },
    {
      id: "screen-notice-6",
      category: "notice",
      title: "작업 팁은 계속 업데이트됩니다",
      content:
        "자주 들어오는 요청을 바탕으로 간단한 점검 팁을 조금씩 정리하고 있어요.",
      author: "뚝딱 운영팀",
      authorAvatar: "",
      hours: 58,
      views: 45,
      likes: 0,
      comments: 0,
    },
    {
      id: "screen-notice-7",
      category: "notice",
      title: "후기 작성 시 업체명 노출은 조심해주세요",
      content:
        "후기는 자유롭게 남길 수 있지만, 연락처나 주소 같은 정보는 공개되지 않도록 한 번 확인해주세요.",
      author: "뚝딱 운영팀",
      authorAvatar: "",
      hours: 71,
      views: 32,
      likes: 0,
      comments: 0,
    },
    {
      id: "screen-notice-8",
      category: "notice",
      title: "커뮤니티 글 수정 기능이 추가됐어요",
      content:
        "본인이 작성한 글은 상세 화면의 메뉴에서 수정할 수 있습니다. 관리자는 운영 목적상 전체 글 관리가 가능합니다.",
      author: "뚝딱 운영팀",
      authorAvatar: "",
      hours: 85,
      views: 49,
      likes: 0,
      comments: 0,
    },
    {
      id: "screen-notice-9",
      category: "notice",
      title: "사진은 최대한 밝게 찍어주세요",
      content:
        "어두운 사진은 위치 확인이 어려울 수 있어요. 가능하면 조명을 켜고 흔들리지 않게 찍어주세요.",
      author: "뚝딱 운영팀",
      authorAvatar: "",
      hours: 96,
      views: 36,
      likes: 0,
      comments: 0,
    },
    {
      id: "screen-notice-10",
      category: "notice",
      title: "커뮤니티는 테스트 운영 중입니다",
      content:
        "현재 커뮤니티 기능은 일부 화면과 기능을 다듬는 중입니다. 이용 중 어색한 부분은 계속 개선하겠습니다.",
      author: "뚝딱 운영팀",
      authorAvatar: "",
      hours: 120,
      views: 57,
      likes: 0,
      comments: 0,
    },
  ].map(makeScreenPost),
];

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
    authorId: post.authorId || post.author_id || "",
    authorAvatar: post.authorAvatar || post.author_avatar || "",
    comments: countComments(commentList) || Number(post.comments || 0),
    commentList: commentList.map(normalizeComment),
  };
};

export const normalizeComment = (comment) => ({
  ...comment,
  id: comment.id || `comment-${Date.now()}`,
  author: comment.author || "뚝딱 회원",
  authorId: comment.authorId || comment.author_id || "",
  authorAvatar: comment.authorAvatar || comment.author_avatar || "",
  message: comment.message || "",
  createdAt: comment.createdAt || new Date().toISOString(),
  replies: Array.isArray(comment.replies)
    ? comment.replies.map((reply) => ({
        ...reply,
        id: reply.id || `reply-${Date.now()}`,
        author: reply.author || "뚝딱 회원",
        authorId: reply.authorId || reply.author_id || "",
        authorAvatar: reply.authorAvatar || reply.author_avatar || "",
        message: reply.message || "",
        createdAt: reply.createdAt || new Date().toISOString(),
      }))
    : [],
});

export const countComments = (comments = []) =>
  comments.reduce((total, comment) => total + 1 + (comment.replies?.length || 0), 0);

const dedupePosts = (posts = []) => {
  const seen = new Set();

  return posts
    .map(normalizePost)
    .filter((post) => {
      if (!post.id || seen.has(post.id)) return false;
      seen.add(post.id);
      return true;
    });
};

const toDatabasePost = (post) => ({
  id: post.id,
  category: post.category,
  title: post.title,
  content: post.content,
  excerpt: post.excerpt || post.content || "",
  images: post.images || [],
  image: post.image || post.images?.[0]?.src || "",
  author: post.author || "뚝딱 회원",
  author_id: post.authorId || "",
  author_avatar: post.authorAvatar || "",
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
    authorId: row.author_id,
    authorAvatar: row.author_avatar,
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
  const payload = toDatabasePost(normalizePost(post));

  try {
    const { error } = await supabase
      .from(COMMUNITY_TABLE)
      .upsert(payload, { onConflict: "id" });

    if (error) throw error;
    return true;
  } catch (error) {
    if (error?.code === "PGRST204") {
      const { author_id, author_avatar, ...fallbackPayload } = payload;
      const { error: fallbackError } = await supabase
        .from(COMMUNITY_TABLE)
        .upsert(fallbackPayload, { onConflict: "id" });

      if (!fallbackError) return true;
    }

    if (!isMissingCommunityTable(error)) {
      console.error("커뮤니티 글 Supabase 저장 실패:", error);
    }
    return false;
  }
};

export const syncCommunityPost = (post) => persistCommunityPostToSupabase(post);

export const deleteCommunityPost = async (postId) => {
  const nextPosts = getStoredCommunityPosts().filter((post) => post.id !== postId);
  saveCommunityPosts(nextPosts, { syncRemote: false });

  try {
    const { error } = await supabase.from(COMMUNITY_TABLE).delete().eq("id", postId);
    if (error) throw error;
    return true;
  } catch (error) {
    if (!isMissingCommunityTable(error)) {
      console.error("커뮤니티 글 Supabase 삭제 실패:", error);
    }
    return false;
  }
};

const mergeDemoPosts = (posts) => {
  const normalizedPosts = posts.map(normalizePost);
  const existingIds = new Set(normalizedPosts.map((post) => post.id));
  const missingDemoPosts = screenOnlyCommunityPosts.filter(
    (post) => !existingIds.has(post.id)
  ).map(normalizePost);

  return [...missingDemoPosts, ...normalizedPosts];
};

const withScreenOnlyPosts = (posts = []) => {
  const normalizedPosts = dedupePosts(posts).filter(
    (post) => !String(post.id || "").startsWith("demo-")
  );
  const existingIds = new Set(normalizedPosts.map((post) => post.id));
  const missingScreenPosts = screenOnlyCommunityPosts
    .filter((post) => !existingIds.has(post.id))
    .map(normalizePost);

  return dedupePosts([...normalizedPosts, ...missingScreenPosts]);
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

    return dedupePosts(currentPosts);
  } catch (error) {
    console.error("커뮤니티 글 조회 실패:", error);
    return [];
  }
};

export const getCommunityPosts = async () => {
  try {
    let response = await supabase
      .from(COMMUNITY_TABLE)
      .select(
        "id, category, title, content, excerpt, images, image, author, author_id, author_avatar, views, likes, liked, comments, comment_list, created_at, updated_at"
      )
      .order("created_at", { ascending: false });

    if (response.error?.code === "PGRST204") {
      response = await supabase
        .from(COMMUNITY_TABLE)
        .select(
          "id, category, title, content, excerpt, images, image, author, views, likes, liked, comments, comment_list, created_at, updated_at"
        )
        .order("created_at", { ascending: false });
    }

    const { data, error } = response;
    if (error) throw error;

    const remotePosts = Array.isArray(data) ? dedupePosts(data.map(fromDatabasePost)) : [];

    if (remotePosts.length > 0) {
      saveCommunityPosts(remotePosts, { syncRemote: false });
      return withScreenOnlyPosts(remotePosts);
    }
  } catch (error) {
    if (!isMissingCommunityTable(error)) {
      console.error("커뮤니티 글 Supabase 조회 실패:", error);
    }
  }

  return withScreenOnlyPosts(getStoredCommunityPosts());
};

export const saveCommunityPosts = (posts, options = {}) => {
  if (typeof window === "undefined") return false;

  try {
    window.localStorage.setItem(
      COMMUNITY_STORAGE_KEY,
      JSON.stringify(dedupePosts(posts))
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
  authorId = "",
  authorAvatar = "",
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
    authorId,
    authorAvatar,
    createdAt: new Date().toISOString(),
    views: 0,
    likes: 0,
    liked: false,
    comments: 0,
    commentList: [],
  });

  const nextPosts = dedupePosts([post, ...getStoredCommunityPosts()]);
  saveCommunityPosts(nextPosts);
  persistCommunityPostToSupabase(post);

  return post;
};

export const updateCommunityPost = (postId, updater) => {
  const nextPosts = dedupePosts(getStoredCommunityPosts().map((post) =>
    post.id === postId ? normalizePost(updater(post)) : post
  ));

  saveCommunityPosts(nextPosts);
  const updatedPost = nextPosts.find((post) => post.id === postId) || null;
  if (updatedPost) persistCommunityPostToSupabase(updatedPost);
  return updatedPost;
};

export const updateCommunityAuthorProfile = ({
  authorId = "",
  authorName = "",
  authorAvatar = "",
}) => {
  const nextAuthorId = String(authorId || "");
  const nextAuthorName = String(authorName || "").trim();

  if (!nextAuthorId && !nextAuthorName) return false;

  const matchesAuthor = (item) => {
    if (!item) return false;

    if (
      nextAuthorId &&
      item.authorId &&
      String(item.authorId) === nextAuthorId
    ) {
      return true;
    }

    return (
      !item.authorId &&
      nextAuthorName &&
      item.author &&
      String(item.author) === nextAuthorName
    );
  };

  const updateAuthorFields = (item) => {
    if (!matchesAuthor(item)) return item;

    return {
      ...item,
      author: nextAuthorName || item.author,
      authorAvatar,
    };
  };

  const nextPosts = dedupePosts(
    getStoredCommunityPosts().map((post) => {
      const nextPost = updateAuthorFields(post);
      const nextCommentList = (nextPost.commentList || []).map((comment) => ({
        ...updateAuthorFields(comment),
        replies: (comment.replies || []).map(updateAuthorFields),
      }));

      return normalizePost({
        ...nextPost,
        commentList: nextCommentList,
      });
    })
  );

  saveCommunityPosts(nextPosts, { syncRemote: false });

  nextPosts
    .filter((post) => {
      if (matchesAuthor(post)) return true;
      return (post.commentList || []).some(
        (comment) =>
          matchesAuthor(comment) ||
          (comment.replies || []).some((reply) => matchesAuthor(reply))
      );
    })
    .forEach((post) => {
      persistCommunityPostToSupabase(post);
    });

  return true;
};

export const getCommunitySections = (
  posts = withScreenOnlyPosts(getStoredCommunityPosts())
) =>
  communitySectionMeta.map((section) => ({
    ...section,
    posts: posts.filter((post) => post.category === section.id),
  }));

export const getCommunityPreviewSections = (
  posts = withScreenOnlyPosts(getStoredCommunityPosts())
) =>
  getCommunitySections(posts)
    .filter((section) => section.id !== "notice")
    .map((section) => ({
      ...section,
      posts: section.posts.slice(0, 10),
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
