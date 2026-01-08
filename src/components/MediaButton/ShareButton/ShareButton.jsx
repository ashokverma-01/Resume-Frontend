export const handleShare = async (link) => {
  if (!link) {
    alert("Resume link available nahi hai!");
    return;
  }

  // Native Browser Share (Windows Share UI)
  if (navigator.share) {
    try {
      await navigator.share({
        title: "My Resume",
        text: "Check out my professional resume",
        url: link,
      });
    } catch (err) {
      console.log("Share cancel ho gaya");
    }
  } else {
    // Agar share API nahi hai (Fallback)
    try {
      await navigator.clipboard.writeText(link);
      alert("Link copied to clipboard ✅");
    } catch (err) {
      alert("Failed to copy link ❌");
    }
  }
};
