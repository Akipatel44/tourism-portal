export type NavItem = {
  title: string;
  href: string;
  hidden?: boolean; // admin-only or hidden links
};

export const NAV: NavItem[] = [
  { title: 'Home', href: '/' },
  { title: 'Places', href: '/places' },
  { title: 'Mythology', href: '/mythology' },
  { title: 'Nature', href: '/nature' },
  { title: 'Events', href: '/events' },
  { title: 'Gallery', href: '/gallery' },
  { title: 'Visit Guide', href: '/visit-guide' },
  { title: 'Admin', href: '/admin', hidden: true },
];

export default NAV;
