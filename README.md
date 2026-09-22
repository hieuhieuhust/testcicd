# Bảng việc nhỏ — dự án học CI/CD

Đây là một website ghi việc cần làm. Bạn có thể thêm, đánh dấu hoàn thành và xóa việc. Dữ liệu được lưu ngay trong trình duyệt. Dự án dùng HTML, CSS, JavaScript và Node.js, không cần cài thư viện ngoài.

## 1. Chạy trên máy

Cần Node.js 22 trở lên. Mở terminal trong thư mục dự án rồi chạy:

```sh
node scripts/serve.js
```

Mở <http://localhost:3000>. Dừng máy chủ bằng `Ctrl+C`.

## 2. Tự chạy các bước của CI

```sh
node --test
node scripts/build.js
```

`node --test` kiểm tra chức năng thêm, hoàn thành, xóa và đọc dữ liệu. Lệnh build tạo thư mục `dist/` chứa website để triển khai. Nếu lệnh nào báo lỗi, pipeline CI cũng sẽ dừng ở bước tương ứng.

## 3. Đưa dự án lên GitHub

Tạo một repository **public** mới trên GitHub và để trống các tùy chọn tạo sẵn README, `.gitignore` và license. Sau đó chạy, thay URL bằng URL repository của bạn:

```sh
git init
git branch -M main
git add .
git commit -m "Tạo dự án học CI/CD"
git remote add origin https://github.com/TEN-CUA-BAN/TEN-REPO.git
git push -u origin main
```

Vào tab **Actions** của repository để xem từng bước. Sau đó vào **Settings → Pages → Build and deployment → Source**, chọn **GitHub Actions**. Nếu lần chạy đầu đã báo lỗi ở bước deploy vì Pages chưa được bật, vào tab Actions và chọn **Re-run jobs**. Địa chỉ website sẽ hiện trong kết quả job `Triển khai (CD)`.

## 4. Thử quy trình

1. Sửa tiêu đề trong `public/index.html`.
2. Chạy `node --test` và `node scripts/build.js` trên máy.
3. Commit rồi push lên nhánh `main`.
4. Xem job **Kiểm thử và build (CI)**. Chỉ khi job này thành công, job **Triển khai (CD)** mới chạy.
5. Mở website để thấy tiêu đề mới.

Để thử một lần CI thất bại, tạm đổi một kết quả mong đợi trong `tests/tasks.test.js`, commit và push. Bạn sẽ thấy bước kiểm thử báo lỗi và bước triển khai bị bỏ qua. Sau đó sửa lại test và push lần nữa.

## Sơ đồ

```text
Sửa code → commit/push → GitHub Actions → test → build → deploy GitHub Pages
                                CI                         CD
```

File điều khiển quy trình là `.github/workflows/ci-cd.yml`. Một pull request chỉ chạy CI; một lần push lên `main` chạy cả CI và CD.
