const Footer = () => {
  const footerSections = [
    {
      title: 'Shop and Learn',
      links: [
        'Store', 'Mac', 'iPad', 'iPhone', 'Watch', 'Vision', 'AirPods', 'TV & Home', 'AirTag', 'Accessories', 'Gift Cards'
      ]
    },
    {
      title: 'Apple Wallet',
      links: [
        'Wallet', 'Apple Card', 'Apple Pay', 'Apple Cash'
      ]
    },
    {
      title: 'Account',
      links: [
        'Manage Your Apple Account', 'Apple Store Account', 'iCloud.com'
      ]
    },
    {
      title: 'Entertainment',
      links: [
        'Apple One', 'Apple TV+', 'Apple Music', 'Apple Arcade', 'Apple Fitness+', 'Apple News+', 'Apple Podcasts', 'Apple Books', 'App Store'
      ]
    },
    {
      title: 'Apple Store',
      links: [
        'Find a Store', 'Genius Bar', 'Today at Apple', 'Group Reservations', 'Apple Camp', 'Apple Store App', 'Certified Refurbished', 'Apple Trade In', 'Financing', 'Carrier Deals at Apple', 'Order Status', 'Shopping Help'
      ]
    },
    {
      title: 'For Business',
      links: [
        'Apple and Business', 'Shop for Business'
      ]
    },
    {
      title: 'For Education',
      links: [
        'Apple and Education', 'Shop for K-12', 'Shop for College'
      ]
    },
    {
      title: 'For Healthcare',
      links: [
        'Apple and Healthcare'
      ]
    },
    {
      title: 'For Government',
      links: [
        'Shop for Veterans and Military', 'Shop for State and Local Employees', 'Shop for Federal Employees'
      ]
    },
    {
      title: 'Apple Values',
      links: [
        'Accessibility', 'Education', 'Environment', 'Inclusion and Diversity', 'Privacy', 'Racial Equity and Justice', 'Supply Chain Innovation'
      ]
    },
    {
      title: 'About Apple',
      links: [
        'Newsroom', 'Apple Leadership', 'Career Opportunities', 'Investors', 'Ethics & Compliance', 'Events', 'Contact Apple'
      ]
    }
  ];

  return (
    <footer className="bg-gray-100 text-gray-600">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-8">
          {footerSections.map((section, idx) => (
            <div key={section.title} className="space-y-2">
              <h4 className="font-semibold text-gray-900 text-sm">{section.title}</h4>
              <ul className="space-y-1">
                {section.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-gray-600 hover:text-gray-900 hover:underline"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Footer Bottom */}
        <div className="pt-8 border-t border-gray-300">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="text-sm text-gray-600">
              <p>More ways to shop: Find an Apple Store or other retailer near you. Or call 1-800-MY-APPLE (1-800-692-7753).</p>
              <p className="mt-2">United States</p>
            </div>
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4 text-sm text-gray-600">
              <p>Copyright © 2025 Apple Inc. All rights reserved.</p>
              <div className="flex flex-wrap gap-4">
                <a href="#" className="hover:underline">Privacy Policy</a>
                <a href="#" className="hover:underline">Terms of Use</a>
                <a href="#" className="hover:underline">Sales and Refunds</a>
                <a href="#" className="hover:underline">Legal</a>
                <a href="#" className="hover:underline">Site Map</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
