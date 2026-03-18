import { useState } from 'react';
import Layout from '../../components/Layout';
import { 
  MapPin, 
  Camera, 
  Clock, 
  Calendar,
  CheckCircle,
  XCircle,
  AlertCircle,
  Fingerprint
} from 'lucide-react';
import { toast } from 'sonner';

const attendanceHistory = [
  { id: 1, date: '2026-02-24', checkIn: '08:45', checkOut: '18:30', status: 'normal', location: 'Văn phòng HN' },
  { id: 2, date: '2026-02-23', checkIn: '08:50', checkOut: '18:25', status: 'late', location: 'Văn phòng HN' },
  { id: 3, date: '2026-02-22', checkIn: '08:30', checkOut: '17:45', status: 'early', location: 'Văn phòng HN' },
  { id: 4, date: '2026-02-21', checkIn: '08:35', checkOut: '18:40', status: 'overtime', location: 'Văn phòng HN' },
  { id: 5, date: '2026-02-20', checkIn: '08:40', checkOut: '18:30', status: 'normal', location: 'Văn phòng HN' },
];

export default function TimeAttendance() {
  const [checkedIn, setCheckedIn] = useState(false);
  const [checkInTime, setCheckInTime] = useState<string | null>(null);
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [faceVerified, setFaceVerified] = useState(false);

  const handleGPSCheckIn = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          toast.success('Đã lấy vị trí GPS');
        },
        () => {
          toast.error('Không thể lấy vị trí GPS');
        }
      );
    }
  };

  const handleFaceVerification = () => {
    // Mock face verification
    setTimeout(() => {
      setFaceVerified(true);
      toast.success('Nhận diện khuôn mặt thành công');
    }, 1500);
  };

  const handleCheckIn = () => {
    const now = new Date();
    const timeString = now.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
    setCheckInTime(timeString);
    setCheckedIn(true);
    toast.success(`Chấm công vào lúc ${timeString}`);
  };

  const handleCheckOut = () => {
    const now = new Date();
    const timeString = now.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
    toast.success(`Chấm công ra lúc ${timeString}`);
    setCheckedIn(false);
    setCheckInTime(null);
    setLocation(null);
    setFaceVerified(false);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'normal':
        return <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">Bình thường</span>;
      case 'late':
        return <span className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs">Đi trễ</span>;
      case 'early':
        return <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs">Về sớm</span>;
      case 'overtime':
        return <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">Tăng ca</span>;
      default:
        return null;
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl mb-2">Chấm công</h1>
          <p className="text-gray-600">Quản lý thời gian làm việc của bạn</p>
        </div>

        {/* Check-in Card */}
        <div className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl p-8 text-white">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl mb-2">
                {checkedIn ? 'Bạn đã check-in' : 'Chấm công ngay'}
              </h2>
              <p className="text-blue-100">
                {new Date().toLocaleDateString('vi-VN', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            </div>
            <div className="text-5xl">
              {new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}
            </div>
          </div>

          {checkedIn && checkInTime && (
            <div className="bg-white/10 rounded-xl p-4 mb-6">
              <p className="text-sm text-blue-100 mb-1">Giờ vào:</p>
              <p className="text-2xl">{checkInTime}</p>
            </div>
          )}

          {/* Verification Methods */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <button
              onClick={handleGPSCheckIn}
              className={`p-4 rounded-xl border-2 transition-all ${
                location
                  ? 'bg-white/20 border-white'
                  : 'bg-white/5 border-white/30 hover:bg-white/10'
              }`}
            >
              <MapPin className="w-6 h-6 mb-2" />
              <div className="text-sm">
                {location ? '✓ GPS đã xác thực' : 'Xác thực GPS'}
              </div>
            </button>

            <button
              onClick={handleFaceVerification}
              className={`p-4 rounded-xl border-2 transition-all ${
                faceVerified
                  ? 'bg-white/20 border-white'
                  : 'bg-white/5 border-white/30 hover:bg-white/10'
              }`}
            >
              <Camera className="w-6 h-6 mb-2" />
              <div className="text-sm">
                {faceVerified ? '✓ Khuôn mặt đã xác thực' : 'Nhận diện khuôn mặt'}
              </div>
            </button>

            <button className="p-4 rounded-xl border-2 bg-white/5 border-white/30 hover:bg-white/10 transition-all">
              <Fingerprint className="w-6 h-6 mb-2" />
              <div className="text-sm">Vân tay (Máy chấm công)</div>
            </button>
          </div>

          {/* Check-in/out buttons */}
          {!checkedIn ? (
            <button
              onClick={handleCheckIn}
              disabled={!location || !faceVerified}
              className="w-full py-4 bg-white text-blue-600 rounded-xl hover:bg-blue-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <div className="flex items-center justify-center gap-2">
                <Clock className="w-5 h-5" />
                <span>Check In</span>
              </div>
            </button>
          ) : (
            <button
              onClick={handleCheckOut}
              className="w-full py-4 bg-white text-blue-600 rounded-xl hover:bg-blue-50 transition-colors"
            >
              <div className="flex items-center justify-center gap-2">
                <Clock className="w-5 h-5" />
                <span>Check Out</span>
              </div>
            </button>
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="text-sm text-gray-600">Đúng giờ</span>
            </div>
            <div className="text-2xl">18 ngày</div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-2">
              <XCircle className="w-5 h-5 text-red-600" />
              <span className="text-sm text-gray-600">Đi trễ</span>
            </div>
            <div className="text-2xl">2 ngày</div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-2">
              <Clock className="w-5 h-5 text-blue-600" />
              <span className="text-sm text-gray-600">Tăng ca</span>
            </div>
            <div className="text-2xl">15 giờ</div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-2">
              <Calendar className="w-5 h-5 text-purple-600" />
              <span className="text-sm text-gray-600">Nghỉ phép</span>
            </div>
            <div className="text-2xl">3 ngày</div>
          </div>
        </div>

        {/* Attendance History */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-xl">Lịch sử chấm công</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-sm text-gray-600">Ngày</th>
                  <th className="px-6 py-3 text-left text-sm text-gray-600">Giờ vào</th>
                  <th className="px-6 py-3 text-left text-sm text-gray-600">Giờ ra</th>
                  <th className="px-6 py-3 text-left text-sm text-gray-600">Địa điểm</th>
                  <th className="px-6 py-3 text-left text-sm text-gray-600">Trạng thái</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {attendanceHistory.map((record) => (
                  <tr key={record.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      {new Date(record.date).toLocaleDateString('vi-VN')}
                    </td>
                    <td className="px-6 py-4">{record.checkIn}</td>
                    <td className="px-6 py-4">{record.checkOut}</td>
                    <td className="px-6 py-4">{record.location}</td>
                    <td className="px-6 py-4">{getStatusBadge(record.status)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Anti-fraud Info */}
        <div className="bg-yellow-50 rounded-xl p-6 border border-yellow-200">
          <div className="flex gap-3">
            <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="mb-2">Quy định chấm công</h3>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Phải xác thực GPS trong bán kính 100m từ văn phòng</li>
                <li>• Nhận diện khuôn mặt bắt buộc cho mỗi lần chấm công</li>
                <li>• Chỉ được chấm công 1 lần vào/ra mỗi ngày</li>
                <li>• Hệ thống sẽ phát hiện bất thường và cảnh báo</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
