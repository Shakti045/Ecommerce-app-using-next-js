
/** @type {import('next').NextConfig} */
    const nextConfig = {
    images: {
    domains: ["res.cloudinary.com"]
     },
  async headers() {

      return [
          {
              source: "/api/:path*",
              headers: [
                  { key: "Access-Control-Allow-Credentials", value: "true" },
                  { key: "Access-Control-Allow-Origin", value: "https://ecommerce-seller-5u2lxm5l7-shakti045.vercel.app" }, 
                  { key: "Access-Control-Allow-Methods", value: "GET,DELETE,PATCH,POST,PUT" },
                  { key: "Access-Control-Allow-Headers", value: "Content-Type,Authorization" },
                  
              ]
          }
      ]
  }
}

module.exports = nextConfig
