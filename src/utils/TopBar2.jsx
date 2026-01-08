import React, { useEffect, useRef } from "react";

const items = [
  {
    name: "Google",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaCj3HtO9Xpf30OJhy9ZnOlNrvkvBafTzQpw&s",
  },
  {
    name: "Microsoft",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTaaS_aUgtYfp97UZIa2jEmX13eOQyawba2BXUms2qa838r1eI1uyT-2Es&s",
  },
  {
    name: "Amazon",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQQcF3WBRaQA3cmAaY_5APD9WREP03y753Ig&s",
  },
  {
    name: "Meta",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqlw65nPBp2zyl--yQugceuB764hKm84Pab6_S86qHtA&s",
  },
  {
    name: "Facebook",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTW07UOsei3_hqZmso8M5m8qSnQRzCqbxerdA&s",
  },
  {
    name: "Instagram",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMhdzEdO4E2pY4yDs40uDOpSqokkHnfj94wQ&s",
  },
  {
    name: "Whatsapp",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTu2xwJfPnYqMIHxIbdKqTmHPhbSL_10r4Nmo6iIhKYw&s",
  },
  {
    name: "Linkedin",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkx55bSMoTPJnYkhTMm1A912YZjWzmaKgGTg&s",
  },
  {
    name: "Messenger",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSul09FyqvwBtVN3caB4r-pdvgPDcCVB3OyA&s",
  },
  {
    name: "Twitter",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSM5Ka-iBQm95R7eelIAyyrEbV-1Uht9wgUYg&s",
  },
  {
    name: "Youtube",
    logo: "https://img.freepik.com/premium-vector/round-youtube-logo-isolated-white-background_469489-983.jpg?semt=ais_hybrid&w=740&q=80",
  },
  {
    name: "X-Meta",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSIK4K_tADLke0C2Av9_njskzlOqUIVen7aw&s",
  },
];

const TopBar2 = () => {
  const trackRef = useRef(null);

  useEffect(() => {
    const track = trackRef.current;
    let x = 0;

    const speed = 0.6; // px per frame (adjust smoothness)

    const animate = () => {
      x -= speed;
      if (Math.abs(x) >= track.scrollWidth / 2) {
        x = 0; // reset seamlessly
      }
      track.style.transform = `translateX(${x}px)`;
      requestAnimationFrame(animate);
    };

    animate();
  }, []);

  return (
    <div className="border-b bg-gray-50 sticky top-0 z-50 overflow-hidden">
      <div className="w-full py-3">
        <div ref={trackRef} className="flex whitespace-nowrap w-max">
          {[...items, ...items].map((item, i) => (
            <div key={i} className="flex items-center gap-2 px-6">
              <img
                src={item.logo}
                className="w-6 h-6 rounded-full"
                alt={item.name}
              />
              <span className="text-sm font-medium">{item.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopBar2;
