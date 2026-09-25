# GoMate Frontend

Ứng dụng React (JavaScript), sử dụng Node.js/npm để chạy Vite và build frontend.

## Chạy trên máy

Yêu cầu Node.js 22.12+ thuộc nhánh 22 hoặc Node.js 24+. Đã khởi tạo với Node.js 22.23.1 và npm 10.9.8.

```powershell
cd C:\GoMate\GoMate-FE
npm.cmd install
npm.cmd run dev
```

Mở địa chỉ Vite hiển thị trong terminal, mặc định http://localhost:5173.
Trên PowerShell, dùng `npm.cmd` nếu chính sách thực thi chặn `npm.ps1`.

## Các lệnh

- `npm.cmd run dev`: chạy development server, tự cập nhật khi sửa mã.
- `npm.cmd run build`: build production vào thư mục `dist`.
- `npm.cmd run preview`: xem thử bản build trên máy.
- `npm.cmd run lint`: kiểm tra mã bằng Oxlint.
- `npm.cmd ci`: cài đúng phiên bản theo package-lock.json.

## Cấu trúc

- `src/main.jsx`: điểm khởi chạy React.
- `src/App.jsx`: giao diện mẫu, thay nội dung tại đây để phát triển GoMate.
- `src/App.css`, `src/index.css`: CSS giao diện.
- `public/`: tài nguyên tĩnh.
- `vite.config.js`: cấu hình Vite và plugin React.

Node.js trong thư mục này phục vụ công cụ frontend. API backend sẽ được phát triển riêng trong `GoMate-BE`.
Không đặt mật khẩu hoặc khóa bí mật trong biến môi trường có tiền tố `VITE_`, vì chúng được đưa vào mã trình duyệt.
