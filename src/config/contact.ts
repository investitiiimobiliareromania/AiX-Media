export const contactConfig = {
  name: "Cristian Văduva",
  email: "cristianvaduva@duck.com",
  phone: "+40767110439",
  phoneDisplay: "+40 767 110 439",
  whatsapp: "+436509536345",
  whatsappDisplay: "+43 650 953 6345",
  whatsappHref: "https://wa.me/436509536345",
  location: "Bucharest, Romania",
  website: "https://cristianvaduva.com",
  social: {
    linkedin: "https://www.linkedin.com/in/cristianvaduva",
    instagram: "https://www.instagram.com/cristian.vaduva",
    facebook: "https://www.facebook.com/cristianvaduva.ro",
  },
};

export const CONTACT = {
  social: contactConfig.social,
  phone: {
    href: `tel:${contactConfig.phone}`,
    display: contactConfig.phoneDisplay,
  },
  whatsapp: {
    href: contactConfig.whatsappHref,
    display: contactConfig.whatsappDisplay,
  },
  email: {
    href: `mailto:${contactConfig.email}`,
    display: contactConfig.email,
  },
};
