import { useRouter } from "next/router";

const HelpPage = () => {
  const router = useRouter();
  const { slug } = router.query;

  const getContent = () => {
    if (!slug) {
      return <h2>Welcome to the Help Center</h2>;
    }

    const path = slug.join("/");

    switch (path) {
      case "faqs":
        return <p>Here are the frequently asked questions...</p>;
      case "contact":
        return <p>You can reach us at contact@example.com.</p>;
      case "privacy":
        return <p>This is our privacy policy. We respect your data.</p>;
      default:
        return <p>Section not found.</p>;
    }
  };

  return (
    <div
      style={{
        padding: "2rem",
        fontFamily: "Segoe UI, sans-serif",
        color: "black",
      }}>
      <h1>📖 Help Center</h1>
      {getContent()}
    </div>
  );
};

export default HelpPage;
export async function getStaticPaths() {
  return {
    paths: [
      { params: { slug: ["faqs"] } },
      { params: { slug: ["contact"] } },
      { params: { slug: ["privacy"] } },
    ],
    fallback: false,
  };
}
export async function getStaticProps({ params }) {
  return {
    props: {
      slug: params.slug || [],
    },
  };
}