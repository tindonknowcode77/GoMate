import { createContext, PropsWithChildren, useContext, useMemo, useState } from 'react';

export type Language = 'vi' | 'en';

type LanguageContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
  toggleLanguage: () => void;
  translate: (value: string) => string;
};

type Translation = { vi: string; en: string };

const entries: Translation[] = [
  { vi: 'Kết nối • Trải nghiệm • Đồng hành', en: 'Connect • Experience • Together' },
  { vi: 'Chào mừng trở lại', en: 'Welcome back' },
  { vi: 'Bắt đầu cùng GoMate', en: 'Get started with GoMate' },
  { vi: 'Đăng nhập để tiếp tục khám phá hoạt động phù hợp.', en: 'Sign in to keep discovering activities for you.' },
  { vi: 'Tạo tài khoản và gặp những người cùng sở thích.', en: 'Create an account and meet people who share your interests.' },
  { vi: 'Đăng nhập', en: 'Sign in' }, { vi: 'Đăng ký', en: 'Sign up' },
  { vi: 'Họ và tên', en: 'Full name' }, { vi: 'Tên của bạn', en: 'Your name' },
  { vi: 'Mật khẩu', en: 'Password' }, { vi: 'Tối thiểu 8 ký tự', en: 'At least 8 characters' },
  { vi: 'Quên mật khẩu?', en: 'Forgot password?' },
  { vi: 'Bằng việc đăng ký, bạn đồng ý với Điều khoản và Chính sách bảo mật.', en: 'By signing up, you agree to the Terms and Privacy Policy.' },
  { vi: 'Tạo tài khoản', en: 'Create account' }, { vi: 'hoặc tiếp tục với', en: 'or continue with' },
  { vi: 'Chưa có tài khoản? ', en: "Don't have an account? " }, { vi: 'Đã có tài khoản? ', en: 'Already have an account? ' },
  { vi: 'Hoàn thiện hồ sơ', en: 'Complete your profile' },
  { vi: 'Một vài thông tin sẽ giúp bạn gặp đúng người phù hợp.', en: 'A few details help you meet the right people.' },
  { vi: 'Thông tin cơ bản', en: 'Basic information' }, { vi: 'Giữ thông tin đơn giản và dễ nhận biết.', en: 'Keep it simple and easy to recognize.' },
  { vi: 'Ảnh đại diện', en: 'Profile photo' }, { vi: 'Ảnh rõ nét sẽ mang lại hiệu quả tốt nhất.', en: 'A clear photo works best.' },
  { vi: 'Thay đổi', en: 'Change' }, { vi: 'Tên', en: 'Name' }, { vi: 'Tuổi', en: 'Age' },
  { vi: 'Giới thiệu ngắn', en: 'Short intro' }, { vi: 'Một câu ngắn về bạn', en: 'A quick line about you' },
  { vi: 'Khu vực', en: 'Area' }, { vi: 'Sở thích', en: 'Interests' }, { vi: 'Hoàn tất', en: 'Finish' },
  { vi: 'Bỏ qua', en: 'Skip' }, { vi: 'Bỏ qua lúc này', en: 'Skip for now' }, { vi: ' trên ', en: ' of ' },
  { vi: 'Trang chủ', en: 'Home' }, { vi: 'Tạo', en: 'Create' }, { vi: 'Tin nhắn', en: 'Messages' }, { vi: 'Hồ sơ', en: 'Profile' },
  { vi: 'Chào Minh 👋', en: 'Hi Minh 👋' }, { vi: 'Sẵn sàng cho một trải nghiệm mới?', en: 'Ready for a new experience?' },
  { vi: 'Tìm hoạt động hợp với bạn', en: 'Find activities that fit you' },
  { vi: 'Vuốt qua từng gợi ý, xem chi tiết và tham gia khi bạn thấy phù hợp.', en: 'Swipe through suggestions, view details, and join when it feels right.' },
  { vi: 'Bắt đầu match', en: 'Start matching' }, { vi: 'Truy cập nhanh', en: 'Quick access' },
  { vi: 'Hoạt động của tôi', en: 'My activities' }, { vi: '3 sắp tới', en: '3 upcoming' },
  { vi: 'Thông báo', en: 'Notifications' }, { vi: '2 thông báo mới', en: '2 new notifications' },
  { vi: 'Tuần này của bạn', en: 'Your week' }, { vi: 'Tiếp tục kết nối và trải nghiệm', en: 'Keep connecting and exploring' },
  { vi: 'Đã match', en: 'Matches' }, { vi: 'Đã tham gia', en: 'Joined' }, { vi: 'Kết nối mới', en: 'New connections' },
  { vi: 'Hồ sơ đã hoàn thiện 80%', en: 'Profile 80% complete' }, { vi: 'Thêm một vài thông tin để tăng độ tin cậy.', en: 'Add a few details to build more trust.' },
  { vi: 'Hoạt động của bạn', en: 'Your activities' }, { vi: 'Tìm trải nghiệm mới và quản lý mọi yêu cầu tại một nơi.', en: 'Find new experiences and manage every request in one place.' },
  { vi: 'TÌM HOẠT ĐỘNG', en: 'FIND ACTIVITIES' }, { vi: 'Khám phá từng hoạt động phù hợp với bạn', en: 'Discover activities that fit you' },
  { vi: 'Mở chế độ toàn màn hình để vuốt, đọc chi tiết và kết nối với host.', en: 'Open full screen to swipe, view details, and connect with the host.' },
  { vi: 'Bắt đầu tìm', en: 'Start exploring' }, { vi: 'Theo dõi & quản lý', en: 'Track & manage' },
  { vi: '2 đang chờ', en: '2 pending' }, { vi: 'Các hoạt động bạn đã chọn và đang chờ host duyệt.', en: 'Activities you selected that are waiting for host approval.' },
  { vi: 'Yêu cầu tham gia', en: 'Join requests' }, { vi: '3 yêu cầu mới', en: '3 new requests' },
  { vi: 'Hoạt động đã đăng, danh sách thành viên và yêu cầu cần duyệt.', en: 'Published activities, member lists, and requests to review.' },
  { vi: 'Hoạt động tôi tổ chức', en: 'Activities I host' }, { vi: 'Tạo hoạt động', en: 'Create activity' },
  { vi: 'Chia sẻ kế hoạch và tìm đúng đồng đội.', en: 'Share your plan and find the right people.' },
  { vi: 'Thêm ảnh hoạt động', en: 'Add activity photo' }, { vi: 'Ảnh rõ ràng giúp bài đăng nổi bật hơn.', en: 'A clear photo helps your post stand out.' },
  { vi: 'Chọn ảnh', en: 'Choose photo' }, { vi: 'Tên hoạt động', en: 'Activity name' }, { vi: 'Ví dụ: Cà phê cuối tuần', en: 'Example: Weekend coffee' },
  { vi: 'Địa điểm', en: 'Location' }, { vi: 'Chọn khu vực hoặc địa chỉ', en: 'Choose an area or address' },
  { vi: 'Mô tả ngắn', en: 'Short description' }, { vi: 'Hoạt động sẽ diễn ra như thế nào?', en: 'What will the activity be like?' },
  { vi: 'Danh mục', en: 'Category' }, { vi: 'Thời gian', en: 'Time' }, { vi: 'Quy mô nhóm', en: 'Group size' },
  { vi: 'Bạn có thể duyệt thành viên trước khi xác nhận họ tham gia.', en: 'You can review members before confirming their participation.' },
  { vi: 'Đăng hoạt động', en: 'Publish activity' }, { vi: 'Ăn uống', en: 'Food & drink' }, { vi: 'Thể thao', en: 'Sports' },
  { vi: 'Du lịch', en: 'Travel' }, { vi: 'Giải trí', en: 'Entertainment' }, { vi: 'Học hỏi', en: 'Learning' }, { vi: 'Tình nguyện', en: 'Volunteering' },
  { vi: 'Hôm nay', en: 'Today' }, { vi: 'Ngày mai', en: 'Tomorrow' }, { vi: 'Cuối tuần', en: 'Weekend' }, { vi: 'Hôm qua', en: 'Yesterday' },
  { vi: 'Chỉnh sửa hồ sơ', en: 'Edit profile' }, { vi: 'Thay ảnh đại diện', en: 'Change profile photo' },
  { vi: 'Khu vực', en: 'Area' }, { vi: 'Giới thiệu', en: 'About' }, { vi: 'Sở thích', en: 'Interests' }, { vi: 'Lưu thay đổi', en: 'Save changes' },
  { vi: 'Bộ lọc Match', en: 'Match filters' }, { vi: 'Chọn hoạt động phù hợp nhất', en: 'Choose the activities that fit best' }, { vi: 'Đặt lại', en: 'Reset' },
  { vi: 'Chưa có', en: 'No' }, { vi: ' bộ lọc tuỳ chỉnh', en: ' custom filters' }, { vi: 'Kết quả Match sẽ ưu tiên theo lựa chọn bên dưới.', en: 'Match results will prioritize your choices below.' },
  { vi: 'Khoảng cách', en: 'Distance' }, { vi: 'Bán kính tìm kiếm', en: 'Search radius' }, { vi: 'Tối đa ', en: 'Up to ' },
  { vi: 'Loại hoạt động', en: 'Activity type' }, { vi: 'Trình độ phù hợp', en: 'Suitable level' }, { vi: 'Ngân sách', en: 'Budget' },
  { vi: 'Bất kỳ', en: 'Any' }, { vi: 'Mọi trình độ', en: 'All levels' }, { vi: 'Mới bắt đầu', en: 'Beginner' }, { vi: 'Đã có kinh nghiệm', en: 'Experienced' },
  { vi: 'Miễn phí', en: 'Free' }, { vi: 'Dưới 100K', en: 'Under 100K' }, { vi: 'Chỉ hiện hoạt động còn chỗ', en: 'Only show activities with space' },
  { vi: 'Ẩn các nhóm đã đủ thành viên.', en: 'Hide groups that are already full.' }, { vi: 'Áp dụng bộ lọc', en: 'Apply filters' },
  { vi: 'Chưa tìm thấy hoạt động phù hợp', en: 'No suitable activities found' }, { vi: 'Hãy mở rộng khoảng cách hoặc chọn thêm loại hoạt động để tiếp tục Match.', en: 'Increase the distance or choose more activity types to continue matching.' },
  { vi: 'Chỉnh bộ lọc', en: 'Adjust filters' }, { vi: 'BỎ QUA', en: 'SKIP' }, { vi: 'THAM GIA', en: 'JOIN' },
  { vi: 'Về hoạt động', en: 'About this activity' }, { vi: 'Phù hợp cho người mới', en: 'Beginner friendly' },
  { vi: 'Host sẽ gửi hướng dẫn chi tiết sau khi xác nhận tham gia.', en: 'The host will send detailed instructions after confirming your request.' },
  { vi: 'Host & thành viên', en: 'Host & members' }, { vi: ' người đã tham gia', en: ' people joined' },
  { vi: 'Xem host và thành viên', en: 'View host and members' }, { vi: 'Vuốt lên để xem thêm', en: 'Swipe up to see more' },
  { vi: 'YÊU CẦU ĐÃ ĐƯỢC GỬI', en: 'REQUEST SENT' }, { vi: 'Bạn đã chọn một hoạt động tuyệt vời!', en: 'You picked a great activity!' },
  { vi: 'Host sẽ nhận được yêu cầu của bạn. Bạn có thể nhắn tin để giới thiệu nhanh về mình.', en: 'The host will receive your request. You can send a message to introduce yourself.' },
  { vi: 'Đang chờ host xác nhận', en: 'Waiting for host confirmation' }, { vi: 'Nhắn tin cho host', en: 'Message host' }, { vi: 'Tiếp tục match', en: 'Keep matching' },
  { vi: 'Trao đổi với host và các thành viên', en: 'Chat with hosts and members' }, { vi: 'Nhập tin nhắn...', en: 'Type a message...' },
  { vi: 'Yêu cầu đã được xác nhận', en: 'Request confirmed' }, { vi: 'Tin nhắn mới từ Linh', en: 'New message from Linh' },
  { vi: 'Hoạt động sắp diễn ra', en: 'Activity coming up' }, { vi: 'Mới', en: 'New' }, { vi: '5 phút trước', en: '5 minutes ago' }, { vi: '24 phút trước', en: '24 minutes ago' },
  { vi: 'Sắp tới', en: 'Upcoming' }, { vi: 'Đang chờ', en: 'Pending' }, { vi: 'Đã qua', en: 'Past' },
  { vi: 'Đang chờ host', en: 'Waiting for host' }, { vi: 'Đã xác nhận', en: 'Confirmed' },
  { vi: 'Đã chọn và đang chờ duyệt', en: 'Selected and awaiting approval' },
  { vi: 'Host thường phản hồi trong vòng 24 giờ. Bạn có thể xem lại thông tin và profile nhóm trong lúc chờ.', en: 'Hosts usually respond within 24 hours. You can review the activity and group profiles while you wait.' },
  { vi: 'Đang chờ host duyệt', en: 'Waiting for host approval' }, { vi: 'Host đang xem yêu cầu', en: 'Host is reviewing your request' },
  { vi: 'Quản lý hoạt động', en: 'Manage activities' }, { vi: 'Hoạt động bạn đã đăng', en: 'Activities you published' }, { vi: 'HOẠT ĐỘNG ĐÃ ĐĂNG', en: 'PUBLISHED ACTIVITIES' },
  { vi: 'ĐANG MỞ', en: 'OPEN' }, { vi: ' thành viên', en: ' members' }, { vi: 'Xem profile trước khi đưa ra quyết định.', en: 'View profiles before making a decision.' },
  { vi: 'Xem profile', en: 'View profile' }, { vi: 'Đã duyệt thành viên', en: 'Member approved' }, { vi: 'Đã từ chối yêu cầu', en: 'Request declined' },
  { vi: 'Từ chối', en: 'Decline' }, { vi: 'Duyệt', en: 'Approve' }, { vi: 'Profile thành viên', en: 'Member profile' },
  { vi: 'Host hoạt động', en: 'Activity host' }, { vi: 'Thành viên GoMate', en: 'GoMate member' }, { vi: 'Đã tổ chức', en: 'Hosted' },
  { vi: 'Đánh giá', en: 'Rating' }, { vi: 'Đáng tin cậy', en: 'Trusted' }, { vi: 'Báo cáo profile', en: 'Report profile' },
  { vi: 'Chỉnh sửa hồ sơ', en: 'Edit profile' }, { vi: 'An toàn & quyền riêng tư', en: 'Safety & privacy' }, { vi: 'Trợ giúp', en: 'Help' },
  { vi: ' tuổi', en: ' years old' }, { vi: ' hoạt động', en: ' activities' },
  { vi: 'Thành viên', en: 'Members' }, { vi: '2–5 người', en: '2–5 people' }, { vi: '6–10 người', en: '6–10 people' }, { vi: '10+ người', en: '10+ people' },
  { vi: 'Host uy tín • Đã tổ chức 18 hoạt động', en: 'Trusted host • Hosted 18 activities' },
  { vi: 'Danh tính host đã được GoMate xác minh.', en: "The host's identity has been verified by GoMate." },
  { vi: 'THÀNH VIÊN ĐÃ THAM GIA', en: 'JOINED MEMBERS' },
  { vi: 'Chào Minh, bạn đã xem thông tin hoạt động chưa?', en: 'Hi Minh, have you checked the activity details?' },
  { vi: 'Mình xem rồi, lịch này rất phù hợp.', en: 'Yes, I have. The schedule works really well for me.' },
  { vi: 'Bắt đầu cuộc trò chuyện', en: 'Start the conversation' },
  { vi: 'Mình sẽ gửi điểm tập trung nhé!', en: "I'll send the meeting point!" },
  { vi: 'Tối mai mọi người đến trước 15 phút nha.', en: 'Please arrive 15 minutes early tomorrow evening.' },
  { vi: 'Minh Anh: Hẹn mọi người sáng thứ Bảy ☕', en: 'Minh Anh: See you Saturday morning ☕' },
  { vi: 'Bạn đã tham gia “Giao lưu cầu lông”.', en: 'You joined “Badminton meetup”.' },
  { vi: 'Host đã gửi điểm tập trung cho chuyến đi.', en: 'The host sent the meeting point for the trip.' },
  { vi: 'Cà phê cuối tuần bắt đầu sau 1 ngày.', en: 'Weekend coffee starts in 1 day.' },
  { vi: 'Coffee, badminton và những chuyến đi ngẫu hứng ✈️', en: 'Coffee, badminton, and spontaneous trips ✈️' },
  { vi: 'Thích du lịch, nhiếp ảnh và những buổi cà phê cuối tuần.', en: 'Loves travel, photography, and weekend coffee.' },
  { vi: 'Runner, coffee lover và luôn sẵn sàng thử một môn thể thao mới.', en: 'Runner, coffee lover, and always ready to try a new sport.' },
  { vi: 'Tìm những người bạn tích cực để cùng khám phá thành phố.', en: 'Looking for positive friends to explore the city with.' },
  { vi: 'Host yêu thích việc tạo ra những hoạt động an toàn và kết nối mọi người.', en: 'A host who loves creating safe activities that bring people together.' },
  { vi: 'Nhiếp ảnh', en: 'Photography' }, { vi: 'Ẩm thực', en: 'Food' }, { vi: 'Kết nối', en: 'Connecting' },
  { vi: 'Cà phê cuối tuần', en: 'Weekend coffee' }, { vi: 'Giao lưu cầu lông', en: 'Badminton meetup' },
  { vi: 'Săn mây Đà Lạt', en: 'Da Lat cloud hunting' }, { vi: 'Pickleball sau giờ làm', en: 'After-work pickleball' },
  { vi: 'Trò chuyện', en: 'Conversation' }, { vi: 'Cầu lông', en: 'Badminton' }, { vi: 'Năng động', en: 'Active' },
  { vi: 'Thiên nhiên', en: 'Nature' }, { vi: 'Giao lưu', en: 'Social' },
  { vi: 'Thứ Bảy • 09:00', en: 'Saturday • 09:00' }, { vi: 'Thứ Tư • 19:00', en: 'Wednesday • 19:00' },
  { vi: 'Chủ Nhật • 04:30', en: 'Sunday • 04:30' }, { vi: 'Thứ Sáu • 18:30', en: 'Friday • 18:30' },
  { vi: 'Khám phá một quán cà phê yên tĩnh và làm quen với những người bạn mới.', en: 'Discover a quiet coffee shop and meet new friends.' },
  { vi: 'Một buổi đánh đôi nhẹ nhàng, phù hợp cả với người mới bắt đầu.', en: 'A relaxed doubles session that is also suitable for beginners.' },
  { vi: 'Đón bình minh giữa biển mây và ghi lại một buổi sáng thật đáng nhớ.', en: 'Watch the sunrise above the clouds and capture a memorable morning.' },
  { vi: 'Chơi vài trận vui vẻ, vận động nhẹ và kết nối thêm đồng đội mới.', en: 'Play a few fun games, stay active, and meet new teammates.' },
];

const viLookup = new Map(entries.flatMap((entry) => [[entry.vi, entry], [entry.en, entry]]));
const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: PropsWithChildren) {
  const [language, setLanguage] = useState<Language>('vi');
  const value = useMemo<LanguageContextValue>(() => ({
    language,
    setLanguage,
    toggleLanguage: () => setLanguage((current) => current === 'vi' ? 'en' : 'vi'),
    translate: (text) => viLookup.get(text)?.[language] ?? text,
  }), [language]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used inside LanguageProvider');
  return context;
}
