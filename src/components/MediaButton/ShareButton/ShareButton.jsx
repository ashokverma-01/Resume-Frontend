export const handleShare = async (link) => {
  if (!link) {
    alert("Resume link not available");
    return;
  }

  // 📱 Mobile devices → Native Share
  if (navigator.share && /Mobi|Android/i.test(navigator.userAgent)) {
    try {
      await navigator.share({
        title: "My Resume",
        text: "Check out my resume",
        url: link,
      });
    } catch (err) {
      console.log("Share cancelled");
    }
  }
  // 🖥️ Desktop → Copy link
  else {
    try {
      await navigator.clipboard.writeText(link);
      alert("Resume link copied to clipboard ✅");
    } catch (err) {
      alert("Failed to copy link ❌");
    }
  }
};
