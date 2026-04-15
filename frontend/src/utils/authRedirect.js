export function getOAuthRedirectTo() {
  const isLocalhost =
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1";

  if (isLocalhost) {
    return "http://localhost:5173/#/oauth/callback";
  }

  return "https://ohmyungsuk.github.io/my-web-portfolio-ddookddak/#/oauth/callback";
}