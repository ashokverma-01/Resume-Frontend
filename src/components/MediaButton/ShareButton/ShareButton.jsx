export const handleShare = async (link) => {
  // Agar link me 'undefined' ya 'null' text aa raha hai toh use rokein
  if (!link || link.includes("undefined") || link.includes("null")) {
    alert("Resume link valid nahi hai!");
    return;
  }

  if (navigator.share) {
    try {
      await navigator.share({
        title: "My Resume",
        text: "Check out my resume",
        url: link,
      });
    } catch (err) {
      console.log("Share window closed");
    }
  } else {
    // Desktop fallback: Link copy karein
    try {
      await navigator.clipboard.writeText(link);
      alert("Link copied to clipboard ✅");
    } catch (err) {
      alert("Failed to copy link ❌");
    }
  }
};
