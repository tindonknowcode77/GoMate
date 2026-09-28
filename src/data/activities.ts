import { ImageSourcePropType } from 'react-native';

export type Activity = {
  id: string;
  title: string;
  host: string;
  location: string;
  time: string;
  members: string;
  distance: string;
  category: string;
  tags: string[];
  description: string;
  image: ImageSourcePropType;
};

export const activities: Activity[] = [
  {
    id: 'weekend-coffee',
    title: 'Cà phê cuối tuần',
    host: 'Minh Anh',
    location: 'Quận 1, TP.HCM',
    time: 'Thứ Bảy • 09:00',
    members: '3/5',
    distance: '2.5 km',
    category: 'Ăn uống',
    tags: ['Coffee', 'Trò chuyện'],
    description: 'Khám phá một quán cà phê yên tĩnh và làm quen với những người bạn mới.',
    image: require('../assets/Activity-image/cafe.jpg'),
  },
  {
    id: 'badminton-social',
    title: 'Giao lưu cầu lông',
    host: 'Tuấn Kiệt',
    location: 'Phú Nhuận, TP.HCM',
    time: 'Thứ Tư • 19:00',
    members: '4/6',
    distance: '4.1 km',
    category: 'Thể thao',
    tags: ['Cầu lông', 'Năng động'],
    description: 'Một buổi đánh đôi nhẹ nhàng, phù hợp cả với người mới bắt đầu.',
    image: require('../assets/Activity-image/caulong.jpg'),
  },
  {
    id: 'dalat-clouds',
    title: 'Săn mây Đà Lạt',
    host: 'Linh Nguyễn',
    location: 'Đà Lạt, Lâm Đồng',
    time: 'Chủ Nhật • 04:30',
    members: '4/6',
    distance: '28 km',
    category: 'Du lịch',
    tags: ['Đà Lạt', 'Thiên nhiên'],
    description: 'Đón bình minh giữa biển mây và ghi lại một buổi sáng thật đáng nhớ.',
    image: require('../assets/Activity-image/dalat-travel.jpeg'),
  },
  {
    id: 'pickleball-session',
    title: 'Pickleball sau giờ làm',
    host: 'Hoàng Nam',
    location: 'Thủ Đức, TP.HCM',
    time: 'Thứ Sáu • 18:30',
    members: '6/8',
    distance: '7.8 km',
    category: 'Thể thao',
    tags: ['Pickleball', 'Giao lưu'],
    description: 'Chơi vài trận vui vẻ, vận động nhẹ và kết nối thêm đồng đội mới.',
    image: require('../assets/Activity-image/pickerball.jpg'),
  },
];
