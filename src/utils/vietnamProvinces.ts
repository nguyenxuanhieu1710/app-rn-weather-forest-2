// Danh sách các tỉnh thành Việt Nam với tọa độ
export interface VietnamProvince {
  id: string;
  name: string;
  nameEn: string;
  latitude: number;
  longitude: number;
  region: string; // Miền Bắc, Miền Trung, Miền Nam
}

export const vietnamProvinces: VietnamProvince[] = [
  // Miền Bắc
  {id: 'hn', name: 'Hà Nội', nameEn: 'Hanoi', latitude: 21.0285, longitude: 105.8542, region: 'Miền Bắc'},
  {id: 'hp', name: 'Hải Phòng', nameEn: 'Haiphong', latitude: 20.8449, longitude: 106.6881, region: 'Miền Bắc'},
  {id: 'hcm', name: 'Hồ Chí Minh', nameEn: 'Ho Chi Minh City', latitude: 10.8231, longitude: 106.6297, region: 'Miền Nam'},
  {id: 'dn', name: 'Đà Nẵng', nameEn: 'Da Nang', latitude: 16.0544, longitude: 108.2022, region: 'Miền Trung'},
  {id: 'ct', name: 'Cần Thơ', nameEn: 'Can Tho', latitude: 10.0452, longitude: 105.7469, region: 'Miền Nam'},
  {id: 'an', name: 'An Giang', nameEn: 'An Giang', latitude: 10.5216, longitude: 105.1259, region: 'Miền Nam'},
  {id: 'br', name: 'Bà Rịa - Vũng Tàu', nameEn: 'Ba Ria - Vung Tau', latitude: 10.5414, longitude: 107.2424, region: 'Miền Nam'},
  {id: 'bl', name: 'Bạc Liêu', nameEn: 'Bac Lieu', latitude: 9.2942, longitude: 105.7278, region: 'Miền Nam'},
  {id: 'bk', name: 'Bắc Kạn', nameEn: 'Bac Kan', latitude: 22.1470, longitude: 105.8348, region: 'Miền Bắc'},
  {id: 'bg', name: 'Bắc Giang', nameEn: 'Bac Giang', latitude: 21.2734, longitude: 106.1946, region: 'Miền Bắc'},
  {id: 'bn', name: 'Bắc Ninh', nameEn: 'Bac Ninh', latitude: 21.1861, longitude: 106.0763, region: 'Miền Bắc'},
  {id: 'bt', name: 'Bến Tre', nameEn: 'Ben Tre', latitude: 10.2415, longitude: 106.3759, region: 'Miền Nam'},
  {id: 'bd', name: 'Bình Định', nameEn: 'Binh Dinh', latitude: 13.7750, longitude: 109.2233, region: 'Miền Trung'},
  {id: 'bp', name: 'Bình Phước', nameEn: 'Binh Phuoc', latitude: 11.6476, longitude: 106.6056, region: 'Miền Nam'},
  {id: 'bu', name: 'Bình Thuận', nameEn: 'Binh Thuan', latitude: 10.9287, longitude: 108.1021, region: 'Miền Nam'},
  {id: 'cm', name: 'Cà Mau', nameEn: 'Ca Mau', latitude: 9.1776, longitude: 105.1527, region: 'Miền Nam'},
  {id: 'cb', name: 'Cao Bằng', nameEn: 'Cao Bang', latitude: 22.6657, longitude: 106.2577, region: 'Miền Bắc'},
  {id: 'dl', name: 'Đắk Lắk', nameEn: 'Dak Lak', latitude: 12.6662, longitude: 108.0505, region: 'Miền Trung'},
  {id: 'dn2', name: 'Đắk Nông', nameEn: 'Dak Nong', latitude: 12.0046, longitude: 107.6877, region: 'Miền Trung'},
  {id: 'db', name: 'Điện Biên', nameEn: 'Dien Bien', latitude: 21.3860, longitude: 103.0230, region: 'Miền Bắc'},
  {id: 'dg', name: 'Đồng Nai', nameEn: 'Dong Nai', latitude: 10.9574, longitude: 106.8429, region: 'Miền Nam'},
  {id: 'dt', name: 'Đồng Tháp', nameEn: 'Dong Thap', latitude: 10.4930, longitude: 105.7469, region: 'Miền Nam'},
  {id: 'gl', name: 'Gia Lai', nameEn: 'Gia Lai', latitude: 13.9833, longitude: 108.0000, region: 'Miền Trung'},
  {id: 'hg', name: 'Hà Giang', nameEn: 'Ha Giang', latitude: 22.8233, longitude: 104.9833, region: 'Miền Bắc'},
  {id: 'hn2', name: 'Hà Nam', nameEn: 'Ha Nam', latitude: 20.5433, longitude: 105.9139, region: 'Miền Bắc'},
  {id: 'ht', name: 'Hà Tĩnh', nameEn: 'Ha Tinh', latitude: 18.3330, longitude: 105.9000, region: 'Miền Trung'},
  {id: 'hd', name: 'Hải Dương', nameEn: 'Hai Duong', latitude: 20.9373, longitude: 106.3146, region: 'Miền Bắc'},
  {id: 'hb', name: 'Hòa Bình', nameEn: 'Hoa Binh', latitude: 20.8136, longitude: 105.3383, region: 'Miền Bắc'},
  {id: 'hy', name: 'Hưng Yên', nameEn: 'Hung Yen', latitude: 20.6464, longitude: 106.0512, region: 'Miền Bắc'},
  {id: 'kh', name: 'Khánh Hòa', nameEn: 'Khanh Hoa', latitude: 12.2388, longitude: 109.1967, region: 'Miền Trung'},
  {id: 'kg', name: 'Kiên Giang', nameEn: 'Kien Giang', latitude: 9.9580, longitude: 105.1327, region: 'Miền Nam'},
  {id: 'kt', name: 'Kon Tum', nameEn: 'Kon Tum', latitude: 14.3545, longitude: 108.0076, region: 'Miền Trung'},
  {id: 'lc', name: 'Lai Châu', nameEn: 'Lai Chau', latitude: 22.3864, longitude: 103.4567, region: 'Miền Bắc'},
  {id: 'ld', name: 'Lâm Đồng', nameEn: 'Lam Dong', latitude: 11.9404, longitude: 108.4583, region: 'Miền Nam'},
  {id: 'ls', name: 'Lạng Sơn', nameEn: 'Lang Son', latitude: 21.8537, longitude: 106.7613, region: 'Miền Bắc'},
  {id: 'lb', name: 'Lào Cai', nameEn: 'Lao Cai', latitude: 22.4856, longitude: 103.9700, region: 'Miền Bắc'},
  {id: 'la', name: 'Long An', nameEn: 'Long An', latitude: 10.7395, longitude: 106.4144, region: 'Miền Nam'},
  {id: 'nd', name: 'Nam Định', nameEn: 'Nam Dinh', latitude: 20.4207, longitude: 106.1683, region: 'Miền Bắc'},
  {id: 'na', name: 'Nghệ An', nameEn: 'Nghe An', latitude: 18.6796, longitude: 105.6813, region: 'Miền Trung'},
  {id: 'nb', name: 'Ninh Bình', nameEn: 'Ninh Binh', latitude: 20.2506, longitude: 105.9744, region: 'Miền Bắc'},
  {id: 'nt', name: 'Ninh Thuận', nameEn: 'Ninh Thuan', latitude: 11.5640, longitude: 108.9886, region: 'Miền Nam'},
  {id: 'pt', name: 'Phú Thọ', nameEn: 'Phu Tho', latitude: 21.3087, longitude: 105.3117, region: 'Miền Bắc'},
  {id: 'py', name: 'Phú Yên', nameEn: 'Phu Yen', latitude: 13.0884, longitude: 109.0927, region: 'Miền Trung'},
  {id: 'qb', name: 'Quảng Bình', nameEn: 'Quang Binh', latitude: 17.4687, longitude: 106.6227, region: 'Miền Trung'},
  {id: 'qn', name: 'Quảng Nam', nameEn: 'Quang Nam', latitude: 15.8801, longitude: 108.3380, region: 'Miền Trung'},
  {id: 'qg', name: 'Quảng Ngãi', nameEn: 'Quang Ngai', latitude: 15.1167, longitude: 108.8000, region: 'Miền Trung'},
  {id: 'qn2', name: 'Quảng Ninh', nameEn: 'Quang Ninh', latitude: 21.0064, longitude: 107.2925, region: 'Miền Bắc'},
  {id: 'qt', name: 'Quảng Trị', nameEn: 'Quang Tri', latitude: 16.7470, longitude: 107.1924, region: 'Miền Trung'},
  {id: 'st', name: 'Sóc Trăng', nameEn: 'Soc Trang', latitude: 9.6025, longitude: 105.9739, region: 'Miền Nam'},
  {id: 'sl', name: 'Sơn La', nameEn: 'Son La', latitude: 21.3257, longitude: 103.9167, region: 'Miền Bắc'},
  {id: 'ty', name: 'Tây Ninh', nameEn: 'Tay Ninh', latitude: 11.3131, longitude: 106.0963, region: 'Miền Nam'},
  {id: 'tb', name: 'Thái Bình', nameEn: 'Thai Binh', latitude: 20.4463, longitude: 106.3366, region: 'Miền Bắc'},
  {id: 'tn', name: 'Thái Nguyên', nameEn: 'Thai Nguyen', latitude: 21.5942, longitude: 105.8482, region: 'Miền Bắc'},
  {id: 'th', name: 'Thanh Hóa', nameEn: 'Thanh Hoa', latitude: 19.8067, longitude: 105.7850, region: 'Miền Trung'},
  {id: 'hu', name: 'Thừa Thiên Huế', nameEn: 'Thua Thien Hue', latitude: 16.4637, longitude: 107.5909, region: 'Miền Trung'},
  {id: 'tg', name: 'Tiền Giang', nameEn: 'Tien Giang', latitude: 10.3600, longitude: 106.3600, region: 'Miền Nam'},
  {id: 'tv', name: 'Trà Vinh', nameEn: 'Tra Vinh', latitude: 9.9347, longitude: 106.3453, region: 'Miền Nam'},
  {id: 'tq', name: 'Tuyên Quang', nameEn: 'Tuyen Quang', latitude: 21.8233, longitude: 105.2183, region: 'Miền Bắc'},
  {id: 'vl', name: 'Vĩnh Long', nameEn: 'Vinh Long', latitude: 10.2537, longitude: 105.9722, region: 'Miền Nam'},
  {id: 'vp', name: 'Vĩnh Phúc', nameEn: 'Vinh Phuc', latitude: 21.3087, longitude: 105.5972, region: 'Miền Bắc'},
  {id: 'yb', name: 'Yên Bái', nameEn: 'Yen Bai', latitude: 21.7050, longitude: 104.8696, region: 'Miền Bắc'},
];

// Tìm kiếm tỉnh theo tên
export const searchVietnamProvinces = (query: string): VietnamProvince[] => {
  if (!query || query.length < 1) {
    return [];
  }

  const lowerQuery = query.toLowerCase();
  return vietnamProvinces.filter(
    province =>
      province.name.toLowerCase().includes(lowerQuery) ||
      province.nameEn.toLowerCase().includes(lowerQuery) ||
      province.name.toLowerCase().includes(lowerQuery.replace(/\s/g, '')) ||
      province.nameEn.toLowerCase().includes(lowerQuery.replace(/\s/g, '')),
  );
};

// Lấy tỉnh theo ID
export const getProvinceById = (id: string): VietnamProvince | undefined => {
  return vietnamProvinces.find(p => p.id === id);
};

// Lấy tỉnh theo tên
export const getProvinceByName = (name: string): VietnamProvince | undefined => {
  return vietnamProvinces.find(
    p => p.name.toLowerCase() === name.toLowerCase() || p.nameEn.toLowerCase() === name.toLowerCase(),
  );
};


