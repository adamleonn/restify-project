import Image from 'next/image';
import Link from 'next/link';

export default function AdminHomePage() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center pt-24 p-6 font-sans text-gray-800">
      
      {/* Logo */}
      <div className="mb-10">
         <div className="relative w-56 h-16 opacity-90">
             <Image src="/images/logo-putih.png" alt="Restify Logo" fill className="object-contain" priority />
         </div>
      </div>
      
      {/* Title */}
      <h1 className="text-2xl font-semibold mb-12 tracking-wide text-black">ADMIN</h1>
      
      {/* Menu Buttons */}
      <div className="flex flex-col gap-6 w-full max-w-sm mb-20">
        <Link href="/admin/hotels" className="w-full bg-[#5E6B52] text-white py-4 rounded-[14px] font-medium text-lg text-center hover:bg-opacity-90 transition-all shadow-sm">
          Data Hotel
        </Link>
        <Link href="/admin/dataPengguna" className="w-full bg-[#5E6B52] text-white py-4 rounded-[14px] font-medium text-lg text-center hover:bg-opacity-90 transition-all shadow-sm">
          Data Pengguna
        </Link>
      </div>

      {/* Logout Button */}
      <div className="w-full max-w-[200px]">
        <Link href="/login" className="block w-full bg-[#FF4500] text-white py-3 rounded-full font-bold text-[15px] tracking-wide text-center hover:bg-red-600 transition-colors shadow">
          Keluar
        </Link>
      </div>

    </div>
  );
}
