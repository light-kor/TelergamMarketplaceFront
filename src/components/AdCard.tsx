import { AdWithRelations } from '../types';

interface AdCardProps {
  ad: AdWithRelations;
  onClick?: () => void;
}

export function AdCard({ ad, onClick }: AdCardProps) {
  // Получаем первую фотографию или placeholder
  const firstImage = ad.images && ad.images.length > 0 
    ? ad.images[0].image_url 
    : 'https://via.placeholder.com/300x200?text=No+Image';

  // Форматируем цену
  const formatPrice = (price: number | string): string => {
    const numPrice = typeof price === 'string' ? parseFloat(price) : price;
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(numPrice);
  };

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer border border-gray-200"
    >
      {/* Изображение */}
      <div className="relative w-full aspect-[4/3] bg-gray-100 overflow-hidden">
        <img
          src={firstImage}
          alt={ad.title}
          className="w-full h-full object-cover"
          onError={(e) => {
            // Fallback на placeholder при ошибке загрузки
            (e.target as HTMLImageElement).src = 'https://via.placeholder.com/300x200?text=No+Image';
          }}
        />
      </div>

      {/* Контент */}
      <div className="p-3">
        {/* Заголовок */}
        <h3 className="text-sm font-medium text-gray-900 line-clamp-2 mb-2 min-h-[2.5rem]">
          {ad.title}
        </h3>

        {/* Цена */}
        <div className="text-lg font-bold text-gray-900">
          {formatPrice(ad.price)}
        </div>
      </div>
    </div>
  );
}

