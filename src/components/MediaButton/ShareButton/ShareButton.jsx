export const handleShare = async (link) => {
  // Check if link contains 'undefined' or 'null' as a string
  if (!link || link.includes("undefined") || link.includes("null")) {
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
      console.log("Share menu closed");
    }
  } else {
    // Desktop ke liye clipboard copy
    try {
      await navigator.clipboard.writeText(link);
      alert("Link copied to clipboard ✅");
    } catch (err) {
      alert("Copy failed ❌");
    }
  }
};
