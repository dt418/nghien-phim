import type { MenuItems } from '~/types/menu'

export const menuItems: MenuItems = [
  {
    label: 'Tivi Show',
    href: '/danh-sach/tv-shows',
  },
  {
    label: 'Phim lẻ',
    href: '/danh-sach/phim-le',
  },
  {
    label: 'Phim bộ',
    href: '/danh-sach/phim-bo',
  },
  {
    label: 'Phim đang chiếu',
    href: '/danh-sach/phim-dang-chieu',
  },
  {
    label: 'Thể loại',
    href: '/the-loai',
    children: [
      { label: 'Hành Động', href: '/the-loai/hanh-dong' },
      { label: 'Hài', href: '/the-loai/hai' },
      { label: 'Chính Kịch', href: '/the-loai/chinh-kich' },
      { label: 'Lịch Sử', href: '/the-loai/lich-su' },
      { label: 'Bí Ẩn', href: '/the-loai/bi-an' },
      { label: 'Gây Cấn', href: '/the-loai/gay-can' },
      { label: 'Tình Cảm', href: '/the-loai/tinh-cam' },
      { label: 'Phim 18+', href: '/the-loai/phim-18' },
      { label: 'Phiêu Lưu', href: '/the-loai/phieu-luu' },
      { label: 'Hoạt Hình', href: '/the-loai/hoat-hinh' },
      { label: 'Hình Sự', href: '/the-loai/hinh-su' },
      { label: 'Tài Liệu', href: '/the-loai/tai-lieu' },
      { label: 'Gia Đình', href: '/the-loai/gia-dinh' },
      { label: 'Giả Tưởng', href: '/the-loai/gia-tuong' },
      { label: 'Kinh Dị', href: '/the-loai/kinh-di' },
      { label: 'Nhạc', href: '/the-loai/nhac' },
      { label: 'Lãng Mạn', href: '/the-loai/lang-man' },
      { label: 'Khoa Học Viễn Tưởng', href: '/the-loai/khoa-hoc-vien-tuong' },
      { label: 'Chiến Tranh', href: '/the-loai/chien-tranh' },
      { label: 'Tâm Lý', href: '/the-loai/tam-ly' },
      { label: 'Cổ Trang', href: '/the-loai/co-trang' },
      { label: 'Miền Tây', href: '/the-loai/mien-tay' },
    ],
  },
  {
    label: 'Quốc gia',
    href: '/quoc-gia',
    children: [
      { label: 'Âu Mỹ', href: '/quoc-gia/au-my' },
      { label: 'Anh', href: '/quoc-gia/anh' },
      { label: 'Trung Quốc', href: '/quoc-gia/trung-quoc' },
      { label: 'Indonesia', href: '/quoc-gia/indonesia' },
      { label: 'Việt Nam', href: '/quoc-gia/viet-nam' },
      { label: 'Pháp', href: '/quoc-gia/phap' },
      { label: 'Hồng Kông', href: '/quoc-gia/hong-kong' },
      { label: 'Hàn Quốc', href: '/quoc-gia/han-quoc' },
      { label: 'Nhật Bản', href: '/quoc-gia/nhat-ban' },
      { label: 'Thái Lan', href: '/quoc-gia/thai-lan' },
      { label: 'Đài Loan', href: '/quoc-gia/dai-loan' },
      { label: 'Nga', href: '/quoc-gia/nga' },
      { label: 'Hà Lan', href: '/quoc-gia/ha-lan' },
      { label: 'Philippines', href: '/quoc-gia/philippines' },
      { label: 'Ấn Độ', href: '/quoc-gia/an-do' },
      { label: 'Quốc gia khác', href: '/quoc-gia/quoc-gia-khac' },
    ],
  },
  {
    label: 'Năm',
    href: '/nam-phat-hanh',
    children: Array.from(
      { length: new Date().getFullYear() - 2003 },
      (_, index) => {
        const year = new Date().getFullYear() - index
        return { label: year.toString(), href: `/nam-phat-hanh/${year}` }
      },
    ),
  },
]

export default menuItems

export function findHrefByLabel(label: string): string | undefined {
  const searchInItems = (items: MenuItems): string | undefined => {
    for (const item of items) {
      if (item.label === label)
        return item.href
      if (item.children) {
        const found = searchInItems(item.children)
        if (found)
          return found
      }
    }
    return undefined
  }

  return searchInItems(menuItems)
}
