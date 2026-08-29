# Hệ thống luyện kiểm tra

Website tĩnh dùng HTML + CSS + JavaScript, triển khai được trực tiếp bằng GitHub Pages.

## Chạy không cần VS Code

Cách nhanh nhất: mở file `index.html` bằng Chrome/Edge.

Nếu muốn chạy đúng như một website local:

```bash
python -m http.server 5500
```

Sau đó mở:

`http://localhost:5500`

## Deploy GitHub Pages

1. Tạo một repository GitHub mới.
2. Upload toàn bộ thư mục dự án lên repository.
3. Vào `Settings` → `Pages`.
4. Chọn `Deploy from a branch`.
5. Chọn branch `main`, folder `/root`.
6. Lưu lại và chờ GitHub Pages build.

## Lưu dữ liệu

Dữ liệu bài kiểm tra được lưu bằng `localStorage` của trình duyệt.

Vì vậy dữ liệu không tự đồng bộ giữa các thiết bị/trình duyệt khác nhau. Website có sẵn nút **Sao lưu dữ liệu** và **Nhập dữ liệu** để chuyển dữ liệu bằng file JSON.

## Cấu trúc

- `index.html`: giao diện chính.
- `css/style.css`: giao diện responsive.
- `js/data.js`: danh sách link ban đầu.
- `js/app.js`: logic điều hướng, LocalStorage, thêm/sửa/xóa/tìm kiếm/sao lưu.
