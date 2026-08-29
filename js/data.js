// Dữ liệu ban đầu. Sau lần mở đầu tiên, dữ liệu sẽ được lưu vào LocalStorage.
// Bạn có thể sửa/thêm/xóa trực tiếp trên website mà không cần sửa file này.

const INITIAL_DATA = [
  {
    id: 'cat-01', title: 'Nhà nước', icon: '01', type: 'levels', levels: [
      { name: 'Cơ bản', exams: [{ name: 'Nhà nước - Cơ bản', url: 'https://share.gemini.google/yY40QrtKvlVm', date: '' }] },
      { name: 'Trung bình', exams: [{ name: 'Nhà nước - Trung bình', url: 'https://share.gemini.google/MlGN4FXuvo6v', date: '' }] },
      { name: 'Khó', exams: [] }
    ]
  },
  {
    id: 'cat-02', title: 'Nhà nước CHXHCN Việt Nam', icon: '02', type: 'levels', levels: [
      { name: 'Cơ bản', exams: [{ name: 'Nhà nước CHXHCN Việt Nam - Cơ bản', url: 'https://share.gemini.google/eS9n1he2GEty', date: '' }] },
      { name: 'Trung bình', exams: [{ name: 'Nhà nước CHXHCN Việt Nam - Trung bình', url: 'https://share.gemini.google/kVtKqDCHVTcr', date: '' }] },
      { name: 'Nâng cao', exams: [] }
    ]
  },
  {
    id: 'cat-03', title: 'Xây dựng Nhà nước pháp quyền XHCN Việt Nam', icon: '03', type: 'levels', levels: [
      { name: 'Cơ bản', exams: [{ name: 'Xây dựng Nhà nước pháp quyền XHCN Việt Nam - Cơ bản', url: 'https://share.gemini.google/YEkhcbwnlxaW', date: '' }] },
      { name: 'Trung bình', exams: [{ name: 'Xây dựng Nhà nước pháp quyền XHCN Việt Nam - Trung bình', url: 'https://share.gemini.google/g3MN8knOfhL0', date: '' }] },
      { name: 'Khó', exams: [] }
    ]
  },
  {
    id: 'cat-04', title: 'Pháp luật', icon: '04', type: 'levels', levels: [
      { name: 'Cơ bản', exams: [{ name: 'Pháp luật - Cơ bản', url: 'https://share.gemini.google/HwQTpLbXw76g', date: '' }] },
      { name: 'Trung bình', exams: [{ name: 'Pháp luật - Trung bình', url: 'https://share.gemini.google/qWMwa5GSrLQQ', date: '' }] },
      { name: 'Khó', exams: [] }
    ]
  },
  {
    id: 'cat-05', title: 'Quy phạm pháp luật – Hệ thống pháp luật – Quan hệ pháp luật', icon: '05', type: 'levels', levels: [
      { name: 'Cơ bản', exams: [{ name: 'Quy phạm pháp luật – Hệ thống pháp luật – Quan hệ pháp luật - Cơ bản', url: 'https://share.gemini.google/9eJY8mL9B5y0', date: '' }] },
      { name: 'Trung bình', exams: [{ name: 'Quy phạm pháp luật – Hệ thống pháp luật – Quan hệ pháp luật - Trung bình', url: 'https://share.gemini.google/WcOy1GJ7eeNV', date: '' }] },
      { name: 'Khó', exams: [] }
    ]
  },
  {
    id: 'cat-06', title: 'Ý thức pháp luật và văn hoá pháp lý', icon: '06', type: 'levels', levels: [
      { name: 'Cơ bản', exams: [{ name: 'Ý thức pháp luật và văn hoá pháp lý - Cơ bản', url: 'https://share.gemini.google/ADDujl7Xrtk2', date: '' }] },
      { name: 'Trung bình', exams: [{ name: 'Ý thức pháp luật và văn hoá pháp lý - Trung bình', url: 'https://share.gemini.google/kazt1IfZ5C4x', date: '' }] },
      { name: 'Khó', exams: [] }
    ]
  },
  {
    id: 'cat-07', title: 'Thực hiện pháp luật và giải thích pháp luật', icon: '07', type: 'levels', levels: [
      { name: 'Cơ bản', exams: [{ name: 'Thực hiện pháp luật và giải thích pháp luật - Cơ bản', url: 'https://share.gemini.google/O4014Ed0Ijui', date: '' }] },
      { name: 'Trung bình', exams: [{ name: 'Thực hiện pháp luật và giải thích pháp luật - Trung bình', url: 'https://share.gemini.google/ReJcrVHUBIWi', date: '' }] },
      { name: 'Khó', exams: [] }
    ]
  },
  {
    id: 'cat-08', title: 'Vi phạm pháp luật và trách nhiệm pháp lý', icon: '08', type: 'levels', levels: [
      { name: 'Cơ bản', exams: [{ name: 'Vi phạm pháp luật và trách nhiệm pháp lý - Cơ bản', url: 'https://share.gemini.google/Ar4Alqlxv4BO', date: '' }] },
      { name: 'Trung bình', exams: [{ name: 'Vi phạm pháp luật và trách nhiệm pháp lý - Trung bình', url: 'https://share.gemini.google/FeVEn328tSRB', date: '' }] },
      { name: 'Khó', exams: [] }
    ]
  },
  {
    id: 'cat-09', title: 'Pháp luật XHCN Việt Nam', icon: '09', type: 'levels', levels: [
      { name: 'Cơ bản', exams: [{ name: 'Pháp luật XHCN Việt Nam - Cơ bản', url: 'https://share.gemini.google/F1nZNWqLSlRm', date: '' }] },
      { name: 'Trung bình', exams: [{ name: 'Pháp luật XHCN Việt Nam - Trung bình', url: 'https://share.gemini.google/3Kz8ZoyDlR6E', date: '' }] }
    ]
  },
  {
    id: 'cat-10', title: 'Xây dựng và hoàn thiện hệ thống pháp luật Việt Nam', icon: '10', type: 'levels', levels: [
      { name: 'Cơ bản', exams: [{ name: 'Xây dựng và hoàn thiện hệ thống pháp luật Việt Nam - Cơ bản', url: 'https://share.gemini.google/mEQWtykIgmbK', date: '' }] },
      { name: 'Trung bình', exams: [{ name: 'Xây dựng và hoàn thiện hệ thống pháp luật Việt Nam - Trung bình', url: 'https://share.gemini.google/fLNyXqM41Xyk', date: '' }] }
    ]
  },
  {
    id: 'cat-11', title: 'Bổ trợ văn kiện', icon: '11', type: 'levels', levels: [
      { name: 'Bổ trợ 1', exams: [{ name: 'Bổ trợ 1', url: 'https://share.gemini.google/2HuLUSxvq07g', date: '' }] },
      { name: 'Bổ trợ 2', exams: [{ name: 'Bổ trợ 2', url: 'https://share.gemini.google/JQ08LxgV40W4', date: '' }] }
    ]
  },
  {
    id: 'cat-12', title: 'Vận dụng tình huống', icon: '12', type: 'groups', groups: [
      { name: 'Thực hiện pháp luật và giải thích pháp luật', exams: [
        { name: 'Vận dụng 1', url: 'https://share.gemini.google/UqhlDxm5zBu9', date: '' },
        { name: 'Vận dụng 2', url: 'https://share.gemini.google/1pITPmrBgh9p', date: '' }
      ] },
      { name: 'Vi phạm pháp luật và trách nhiệm pháp lý', exams: [
        { name: 'Vận dụng 1', url: 'https://share.gemini.google/TjTtp82QauUj', date: '' },
        { name: 'Vận dụng 2', url: 'https://share.gemini.google/RuQGfesLKkPQ', date: '' }
      ] }
    ]
  },
  {
    id: 'cat-13', title: 'Văn kiện', icon: '13', type: 'levels', levels: [
      { name: 'Văn kiện', exams: [
        { name: 'Văn kiện 1', url: 'https://share.gemini.google/6zhaNeuqXVu8', date: '' },
        { name: 'Văn kiện 2', url: 'https://share.gemini.google/2FPF4b56fAts', date: '' }
      ] }
    ]
  },
  {
    id: 'cat-14', title: 'Luyện full', icon: '14', type: 'levels', levels: [
      { name: 'Luyện đề', exams: [{ name: 'Luyện đề 1', url: 'https://share.gemini.google/pGzNCtZn4pdP', date: '' }] },
      { name: 'Tình huống', exams: [{ name: 'Tình huống 1', url: 'https://share.gemini.google/QyX6wkBY22S1', date: '' }] }
    ]
  },
  {
    id: 'cat-15', title: 'Giải đề', icon: '15', type: 'levels', levels: [
      { name: 'Đề thi', exams: [
        { name: 'Đề 1', url: 'https://share.gemini.google/Q20N0bXjyWXe', date: '' },
        { name: 'Đề 2', url: 'https://share.gemini.google/EL5KTss32YcQ', date: '' }
      ] }
    ]
  },
  {
    id: 'cat-16', title: 'AZT', icon: '16', type: 'azt', groups: [
      { name: 'AZT - Google Forms', exams: [
        { name: 'Bản chất và đặc trưng của nhà nước', url: 'https://docs.google.com/forms/d/e/1FAIpQLSctqF7hEEA8XxLFGJLZreK2n9YllyBnYKnrKkT7LiNNl0wpiw/viewform' },
        { name: 'Chức năng của nhà nước', url: 'https://docs.google.com/forms/d/e/1FAIpQLSfjsHuMPWe80OMKD19EERLmvjV6wl5-ZDSRC0GY5ukmCXvozg/viewform' },
        { name: 'Bộ máy nhà nước', url: 'https://docs.google.com/forms/d/e/1FAIpQLScNqr7DTQAhOPXrC9OIielYOTxk1CSEum3j20yrzG7WV_mm6g/viewform' },
        { name: 'Bộ máy nhà nước Việt Nam', url: 'https://docs.google.com/forms/d/e/1FAIpQLSc1pBQ7uugT5FU6fZ1XqbFkqw_MeKfUH5tqwkO-Vb5DWp5q6A/viewform' },
        { name: 'Hình thức nhà nước', url: 'https://docs.google.com/forms/d/e/1FAIpQLSdjPThkZD45VYoaBhHk07WOwZyDeqbRJjZUGsoC3VmkGdp3JA/viewform' },
        { name: 'Nhà nước pháp quyền', url: 'https://docs.google.com/forms/d/e/1FAIpQLScBnuwlM8mt7xnjOKgSWi0kTjAAF6zvpeY7Q9WHWoDsOWXl_g/viewform' },
        { name: 'Khái niệm và đặc điểm Nhà nước pháp quyền và Nhà nước pháp quyền XHCN', url: 'https://docs.google.com/forms/d/e/1FAIpQLScCkn2e06mLk4t7xxsCWS_3BQ5inZoT9SItT1dV8CIPJpSnLA/viewform' },
        { name: 'Nhà nước pháp quyền XHCN Việt Nam 1', url: 'https://docs.google.com/forms/d/e/1FAIpQLSfdmdXYqx8LMNb0ofn3s0FVtDHVsl5Ucw_SQ4UHUx-SGqyIHg/viewform' },
        { name: 'Nhà nước pháp quyền XHCN Việt Nam 2', url: 'https://docs.google.com/forms/d/e/1FAIpQLSfv7ACcT9SSmdejatY8E-DqiYG1ZOEp3Nz34xVLkEi_tBlkBw/viewform' },
        { name: 'Khái niệm và nguồn gốc của pháp luật', url: 'https://docs.google.com/forms/d/e/1FAIpQLScYP_InfL9PI2_e6F8lPydhJ-XA7JhoVRyptMa-SbtFEK1FvA/viewform' },
        { name: 'Pháp luật XHCN', url: 'https://docs.google.com/forms/d/e/1FAIpQLSetRKO3nlU2Bzw3KO5CEDtoycXniphfPq5tQwZlqckzdE1_5g/viewform' },
        { name: 'Bản chất của pháp luật', url: 'https://docs.google.com/forms/d/e/1FAIpQLSdv6nMZoj-T-YWDz-yGfN2PgV0SO8QSnxlh4E7gLfeakJ0RUw/viewform' },
        { name: 'Đặc trưng của pháp luật', url: 'https://docs.google.com/forms/d/e/1FAIpQLScBaTpTHuO_k4EMzeLk74PNRXRZ5beLOpokLo4FQusJp8pLfw/viewform' },
        { name: 'Vai trò và chức năng của pháp luật', url: 'https://docs.google.com/forms/d/e/1FAIpQLSdZpLFISPRDXe0iMYhrS3bLWqtjdzvn0lysZssFPk7DCy01yw/viewform' },
        { name: 'Hình thức pháp luật', url: 'https://docs.google.com/forms/d/e/1FAIpQLSeytVOxLtxwcehdk7VoSg2thhUrTEFWVrYlOCmYU-Nd79dK8w/viewform' },
        { name: 'Khái niệm và đặc điểm của quy phạm pháp luật', url: 'https://docs.google.com/forms/d/e/1FAIpQLSdH5BhqGN6mDsTzEgG_zcd6spx8-dwD6SxODt19H1ZVwWDrVA/viewform' },
        { name: 'Khái niệm và đặc điểm của quan hệ pháp luật', url: 'https://docs.google.com/forms/d/e/1FAIpQLSc2fKXpA_Lgw84-FAXmeb9rayQ2JDzTm8_aVuLko06dlnqy9A/viewform' },
        { name: 'Các yếu tố cấu thành quan hệ pháp luật', url: 'https://docs.google.com/forms/d/e/1FAIpQLSdSbP02uxGzbdLmuKK1C53u8sZIhWn7Srgu28dseDTFE_y6CA/viewform' },
        { name: 'Sự kiện pháp lý', url: 'https://docs.google.com/forms/d/e/1FAIpQLSfLiADYqdNvCL9vPxd2Gi8pRAa_5zbPele9vqj90SSZMiKFxg/viewform' },
        { name: 'Áp dụng pháp luật', url: 'https://docs.google.com/forms/d/e/1FAIpQLSftzZTu12_651FXHWoTT01IAMdhQGH1BCeb-imCe7cAdu5p1A/viewform' },
        { name: 'Vi phạm pháp luật', url: 'https://docs.google.com/forms/d/e/1FAIpQLScWHqTOnhIsbbzpUZGmZccEoicT0FoRp1jeowSnQHiC380s-g/viewform' },
        { name: 'Trách nhiệm pháp lý', url: 'https://docs.google.com/forms/d/e/1FAIpQLSfvwaDj_-AfUHhh1JoJcsHdEXP6tDajrdrV0emMpQpF0PhICg/viewform' }
      ] },
      { name: 'HOCIZ', exams: [
        { name: 'Đề minh hoạ', url: 'https://hociz.vn/de-thi/431' },
        { name: 'Luyện đề 1', url: 'https://hociz.vn/de-thi/439' },
        { name: 'Luyện đề 2', url: 'https://hociz.vn/de-thi/441' },
        { name: 'Chinh phục kì thi', url: 'https://hociz.vn/de-thi/419' }
      ] }
    ]
  }
];
