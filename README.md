# GoMate Mobile

Ứng dụng kết nối hoạt động được xây dựng bằng React Native, Expo SDK 57 và
TypeScript. Luồng hiện tại gồm đăng nhập/đăng ký, hoàn thiện hồ sơ và khu vực
ứng dụng chính với năm tab: Trang chủ, Match, Tạo, Tin nhắn và Hồ sơ.

Tab Match là trung tâm tìm và quản lý hoạt động: mở chế độ khám phá toàn màn hình,
xem lại yêu cầu đang chờ duyệt, hoặc quản lý hoạt động đã đăng và duyệt thành
viên. Trong chế độ khám phá, người dùng có thể vuốt ngang để bỏ qua/tham gia,
cuộn dọc để đọc thêm và mở profile host hoặc từng thành viên.

## Chạy dự án

```powershell
npm.cmd install
npm.cmd start
```

Quét QR bằng Expo Go hoặc nhấn `a` để mở Android emulator. Trên PowerShell, dùng
`npm.cmd` nếu chính sách thực thi chặn `npm.ps1`.

## Kiểm tra

- `npm.cmd run typecheck`: kiểm tra TypeScript.
- `npm.cmd run lint`: kiểm tra mã bằng Expo ESLint.
- `npx.cmd expo-doctor`: kiểm tra cấu hình và dependency Expo.
- `npx.cmd expo export --platform android --output-dir dist`: tạo Android bundle.

## Cấu trúc chính

- `App.tsx`: điều phối xác thực, onboarding và ứng dụng chính.
- `src/screens/`: toàn bộ màn hình auth, profile, dashboard, Match, bộ lọc,
  tạo hoạt động, tin nhắn và các luồng phụ.
- `src/components/`: header, bottom navigation, activity card và UI dùng lại.
- `src/data/activities.ts`: dữ liệu activity mẫu cho Match.
- `src/assets/Activity-image/`: bốn ảnh hoạt động do dự án cung cấp.
- `docs/`: nhật ký phát triển và quyết định sản phẩm/kỹ thuật.

Hiện dữ liệu và điều hướng được giữ cục bộ để hoàn thiện prototype UI. Backend,
xác thực thật, upload và lưu trữ lâu dài chưa được kết nối.
