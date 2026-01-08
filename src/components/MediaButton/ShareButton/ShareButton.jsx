export const handleShare = async (resumeLink) => {
  if (!resumeLink) return alert("Resume link not found");

  if (navigator.share) {
    // Mobile devices
    try {
      await navigator.share({
        url: resumeLink,
      });
    } catch (err) {
      console.log("Share cancelled", err);
    }
  } else {
    // Desktop fallback → copy to clipboard
    try {
      await navigator.clipboard.writeText(resumeLink);
      alert("Resume link copied to clipboard!");
    } catch (err) {
      alert("Failed to copy link");
    }
  }
};
