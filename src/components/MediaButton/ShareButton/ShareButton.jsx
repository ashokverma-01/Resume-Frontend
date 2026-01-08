export const handleShare = async (link) => {
  if (!link || link.includes("null") || link.includes("undefined")) {
    alert("Resume link valid nahi hai!");
    return;
  }

  if (navigator.share) {
    try {
      await navigator.share({
        title: "My Resume",
        url: link,
      });
    } catch (err) {
      console.log("User closed share menu");
    }
  } else {
    // Desktop Fallback
    navigator.clipboard.writeText(link);
    alert("Link copied to clipboard! ✅");
  }
};
