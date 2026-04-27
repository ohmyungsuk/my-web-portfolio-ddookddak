import electricIcon from "../assets/category-icons/electric.svg";
import plumbingIcon from "../assets/category-icons/plumbing.svg";
import leakIcon from "../assets/category-icons/leak.svg";
import doorIcon from "../assets/category-icons/door.svg";
import airconIcon from "../assets/category-icons/aircon.svg";
import cctvIcon from "../assets/category-icons/cctv.svg";
import glassIcon from "../assets/category-icons/glass.svg";
import applianceIcon from "../assets/category-icons/appliance.svg";
import cleaningIcon from "../assets/category-icons/cleaning.svg";
import signIcon from "../assets/category-icons/sign.svg";
import etcIcon from "../assets/category-icons/etc.svg";

export const categoryIcons = {
  전기: electricIcon,
  "전기/조명": electricIcon,

  설비: plumbingIcon,
  "설비/배관": plumbingIcon,

  누수: leakIcon,
  "누수/방수": leakIcon,

  도어락: doorIcon,
  "도어락/출입문": doorIcon,

  에어컨: airconIcon,
  "에어컨/환기": airconIcon,

  CCTV: cctvIcon,
  "CCTV/네트워크": cctvIcon,

  간판: signIcon,

  "유리/창호": glassIcon,

  "가전/생활수리": applianceIcon,
  가전: applianceIcon,

  "청소/철거": cleaningIcon,
  청소: cleaningIcon,

  기타: etcIcon,
  "기타 유지보수": etcIcon,
};

export function getCategoryIcon(category) {
  return categoryIcons[category] || etcIcon;
}