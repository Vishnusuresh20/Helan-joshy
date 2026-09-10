export interface WeddingData {
  couple: {
    bride: string;
    groom: string;
    brideShort: string;
    groomShort: string;
    initials: string;
  };
  wedding: {
    date: string;
    rawDate: string; // ISO format for countdown
    time: string;
    venue: string;
    location: string;
    city: string;
    state: string;
    mapsUrl: string;
  };
  reception: {
    date: string;
    time: string;
    venue: string;
    location: string;
    city: string;
    state: string;
    mapsUrl: string;
  };
  family: {
    brideParents: string;
    brideFather: string;
    brideMother: string;
    groomParents: string;
    groomFather: string;
    groomMother: string;
  };
  verse: {
    text: string;
    reference: string;
  };
  message: string;
  timeline: Array<{
    time: string;
    title: string;
    venue: string;
    description: string;
  }>;
  story: Array<{
    title: string;
    subtitle: string;
    content: string;
  }>;
  gallery: Array<{
    id: number;
    url: string;
    title: string;
    caption: string;
    aspectRatio: string;
  }>;
}

export const weddingData: WeddingData = {
  couple: {
    bride: "Jennifer",
    groom: "Augustine",
    brideShort: "Jennifer",
    groomShort: "Augustine",
    initials: "A & J",
  },

  wedding: {
    date: "23 November 2026",
    rawDate: "2026-11-23T10:00:00+05:30",
    time: "10:00 AM",
    venue: "St. Mary's Orthodox Church",
    location: "Vandiperiyar, Idukki, Kerala",
    city: "Vandiperiyar, Idukki",
    state: "Kerala",
    mapsUrl: "https://maps.app.goo.gl/Z5Ve7VhVqyibf1VA7",
  },

  reception: {
    date: "23 November 2026",
    time: "12:30 PM",
    venue: "Santhom Auditorium",
    location: "Kumily Kattappana road, 1st mile, Kumily, Idukki, Kerala",
    city: "Kumily, Idukki",
    state: "Kerala",
    mapsUrl: "https://maps.app.goo.gl/LmTNooFVpUYqa6RXA",
  },

  family: {
    brideParents: "Jacob Chacko & Marykutty Jacob",
    brideFather: "Jacob Chacko",
    brideMother: "Marykutty Jacob",
    groomParents: "Stephen Xavior & Saly Stephen",
    groomFather: "Stephen Xavior",
    groomMother: "Saly Stephen",
  },

  verse: {
    text: "“The Lord God said, ‘It is not good for the man to live alone. I will make a suitable companion to help him.’”",
    reference: "Genesis 2:18",
  },

  message:
    "With the blessings of our beloved parents and families, we joyfully invite you to celebrate the wedding of Jennifer and Augustine as they begin their new journey together in Christ. Your presence and blessings will make our special day even more meaningful.",

  timeline: [
    {
      time: "10:00 AM",
      title: "The Wedding Ceremony",
      venue: "St. Mary's Orthodox Church",
      description: "Sacred Christian nuptial ceremony and covenant blessing in Vandiperiyar.",
    },
    {
      time: "12:30 PM",
      title: "Wedding Reception",
      venue: "Santhom Auditorium",
      description: "Festive celebration, traditional feast, and fellowship at Kumily Kattappana road, 1st mile.",
    },
  ],

  story: [
    {
      title: "HOW WE MET",
      subtitle: "A divine alignment",
      content:
        "Our journey began under God's watchful grace, brought together by shared faith, family values, and a quiet understanding that our paths were meant to intertwine. What started as simple conversations blossomed into a deep, unshakable bond of love and trust.",
    },
    {
      title: "OUR JOURNEY",
      subtitle: "Walking in faith and love",
      content:
        "Through every season, we have grown together in prayer, joy, and mutual devotion. Guided by Christ’s love and supported by our beloved parents, we learned that love is patient, kind, and anchored in divine purpose.",
    },
    {
      title: "THE PROMISE",
      subtitle: "Forever in Christ",
      content:
        "As we step forward into holy matrimony on November 23, 2026, we vow to honor, cherish, and walk hand-in-hand for all the days of our lives. 'We love because He first loved us.' (1 John 4:19)",
    },
  ],

  gallery: [
    {
      id: 1,
      url: "/images/og-image.jpg",
      title: "Augustine & Jennifer",
      caption: "Pre-wedding portrait in full romance",
      aspectRatio: "portrait",
    },
    {
      id: 2,
      url: "/images/couple.png",
      title: "Jennifer & Augustine",
      caption: "Pre-wedding portrait by the shore",
      aspectRatio: "portrait",
    },
    {
      id: 3,
      url: "/images/bride.png",
      title: "The Bride",
      caption: "Jennifer",
      aspectRatio: "portrait",
    },
    {
      id: 4,
      url: "/images/church_art.png",
      title: "St. Mary's Orthodox Church",
      caption: "Sacred Ceremony Venue Illustration",
      aspectRatio: "square",
    },
    {
      id: 5,
      url: "/images/reception_art.png",
      title: "Santhom Auditorium",
      caption: "Wedding Reception Venue Illustration",
      aspectRatio: "square",
    },
  ],
};
