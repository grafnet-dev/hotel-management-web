module.exports = {
  async rewrites() {
    return [
      {
        source: '/api/odoo/:path*',
        destination: 'http://185.166.39.67:8070/api/:path*',
      },
    ];
  },
  images: {
    domains: [
      'images.pexels.com',
      'source.unsplash.com',
      'images.unsplash.com',
      'picsum.photos',
      'cdn-icons-png.flaticon.com',
      'i.pravatar.cc',
      '185.166.39.67', 
    ],
  },
};