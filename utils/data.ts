import { getStoreCollections } from "@/services/store/collection";

// Define the Collection type
export type Collection = {
  slug: number;
  name: string;
  description: string;
  img: string;
  products: number[];
};

// Define the response type
type ApiResponse = {
  success: boolean;
  data?: {
    slug: number;
    name: string;
    description: string;
    image: string; // This matches the API response
    products: number[];
  }[];
  message?: string;
};

// Function to fetch collections data
export const fetchCollectionsData = async (): Promise<Collection[]> => {
  try {
    const response: ApiResponse = await getStoreCollections("test");
    if (response.success && response.data) {
      return response.data.map(item => ({
        ...item,
        img: item.image, // Map 'image' to 'img'
      }));
    }
    return [];
  } catch (error) {
    console.error("Error fetching collections:", error);
    return [];
  }
};


export const Products = [
  {
    slug: 1,
    name: "Product 1",
    description:
      "Lorem ipsum dolor sit amet consecteturotam impedit dolore,assumenda aperiam labore",
    img: "https://pyxis.nymag.com/v1/imgs/56a/6db/88a5a37a862d2b4039e2902909a554ddf3.rsquare.w600.jpg",
    category: "Collection 4",
    price: 1300,
  },
  {
    slug: 22,
    name: "Product 2",
    description:
      "Lorem ipsum dolor sit amet consecteturotam impedit dolore,assumenda aperiam labore",
    img: "https://www.jiomart.com/images/product/original/rvowvf0akl/eyebogler-teal-tshirts-men-tshirt-tshirt-for-men-tshirt-mens-tshirt-men-s-polo-neck-regular-fit-half-sleeves-colorblocked-t-shirt-product-images-rvowvf0akl-0-202402121853.jpg?im=Resize=(500,630)",
    category: "Collection 4",
    isPublished: true,
    isDeleted: false,
    price: 2499,
  },
  {
    slug: 2,
    name: "Product 3",
    description:
      "Lorem ipsum dolor sit amet consecteturotam impedit dolore,assumenda aperiam labore",
    img: "images/product-2.png",
    category: "Collection 1",
    isPublished: true,
    isDeleted: false,
    price: 4856,
  },
  {
    slug: 3,
    name: "Product 4",
    description:
      "Lorem ipsum dolor sit amet consecteturotam impedit dolore,assumenda aperiam labore",
    img: "https://pyxis.nymag.com/v1/imgs/56a/6db/88a5a37a862d2b4039e2902909a554ddf3.rsquare.w600.jpg",
    category: "Collection 2",
    isPublished: true,
    isDeleted: false,
    price: 37465,
  },
  {
    slug: 4,
    name: "Product 5",
    description:
      "Lorem ipsum dolor sit amet consecteturotam impedit dolore,assumenda aperiam labore",
    img: "https://pyxis.nymag.com/v1/imgs/56a/6db/88a5a37a862d2b4039e2902909a554ddf3.rsquare.w600.jpg",
    category: "Collection 3",
    isPublished: true,
    isDeleted: false,
    price: 7635,
  },
];

export const Contents = [
  {
    slug: "2345645745",
    name: "Content first post",
    img: "https://pyxis.nymag.com/v1/imgs/56a/6db/88a5a37a862d2b4039e2902909a554ddf3.rsquare.w600.jpg",
    products: [1, 4, 3],
    type: "tiktok",
  },
  {
    slug: "23455745",
    name: "Content second post",
    img: "https://pyxis.nymag.com/v1/imgs/56a/6db/88a5a37a862d2b4039e2902909a554ddf3.rsquare.w600.jpg",
    products: [1, 2],
    type: "instagram",
  },
];
export const ContentTypes = ["tiktok", "instagram"];
// export const shareIcons = [
//   {
//     alt: "facebook",
//     src: "/icons/shareIcons/facebook.svg",
//   },
//   {
//     alt: "linkedin",
//     src: "/icons/shareIcons/linkedin.svg",
//   },
//   {
//     name: "instagram",
//     alt: "Instagram",
//     src: "/icons/shareIcons/instagram.svg",
//   },
//   {
//     name: "pinterest",
//     alt: "Pinterest",
//     src: "/icons/shareIcons/pinterest.svg",
//   },
//   {
//     name: "snapchat",
//     alt: "Snapchat",
//     src: "/icons/shareIcons/snapchat.svg",
//   },
//   {
//     name: "telegram",
//     alt: "Telegram",
//     src: "/icons/shareIcons/telegram.svg",
//   },
//   {
//     name: "tiktok",
//     alt: "TikTok",
//     src: "/icons/shareIcons/tiktok.svg",
//   },
//   {
//     name: "whatsapp",
//     alt: "WhatsApp",
//     src: "/icons/shareIcons/whatsapp.svg",
//   },
//   {
//     name: "X",
//     alt: "X",
//     src: "/icons/shareIcons/x.svg",
//   },
// ];
