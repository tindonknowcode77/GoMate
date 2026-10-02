# Đăng nhập Google (BE)

API: `POST /api/auth/google`, body JSON:

```json
{ "idToken": "GOOGLE_ID_TOKEN" }
```

BE xác minh chữ ký, audience và thời hạn bằng `google-auth-library`, yêu cầu email
đã xác minh, nhận diện người dùng bằng Google `sub`. Lần đầu tự tạo tài khoản;
lần sau trả lại cùng tài khoản. Response giống `/login`: `accessToken`, `tokenType`,
`expiresIn`, `user`. Dùng **accessToken GoMate** cho `/me` và `/logout`.

## Cấu hình

1. Trong Google Cloud / Google Auth Platform, cấu hình consent screen và tạo OAuth
   client loại Web application. Thêm origin của frontend (ví dụ `http://localhost:3000`).
2. Điền `GOOGLE_CLIENT_ID=...apps.googleusercontent.com` vào `GoMate-BE/.env`.
   Khi deploy, đặt biến này trên Render. Khởi động lại BE để nhận cấu hình và tạo index.
3. Frontend sau này dùng Google Identity Services với cùng client ID; callback nhận
   `credential` là ID token rồi gửi JSON `{ idToken: credential }` đến API này.
   Đây là API JSON, không phải URL redirect nhận form POST từ Google.

Luồng này không cần client secret. Chưa bao gồm nút Google trên FE. Khi triển khai
FE cần cấu hình CSP cho Google Identity Services theo hướng dẫn Google.

## Postman

Import lại collection, điền `googleIdToken` bằng ID token thật lấy từ Google với
đúng client ID, chạy **Google Login**, rồi **Me** hoặc **Logout**. Request tự lưu
token GoMate. Không dùng Google access token, token GoMate hoặc JWT tự tạo làm ID token.

400: thiếu token; 401: token không hợp lệ/hết hạn hoặc email chưa xác minh;
409: email đã thuộc tài khoản khác; 503: chưa cấu hình client ID; 429: quá số lần thử.
Không tự liên kết tài khoản theo email. Người dùng gặp 409 dùng cách đăng nhập cũ;
chưa có chức năng liên kết tài khoản. Tài khoản chỉ dùng Google không có mật khẩu local.

Kiểm thử tự động dùng verifier giả tại ranh giới Google và MongoDB thật trong instance tạm;
không thay thế việc kiểm tra với tài khoản Google thật.

Tham khảo: [Xác minh ID token trên server](https://developers.google.com/identity/gsi/web/guides/verify-google-id-token).
