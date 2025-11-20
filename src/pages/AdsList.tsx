import { useQuery } from '@tanstack/react-query';
import { adsApi } from '../api/ads';
import { AdCard } from '../components/AdCard';
import { AdWithRelations } from '../types';

export function AdsList() {
  const { data: ads, isLoading, error } = useQuery<AdWithRelations[]>({
    queryKey: ['ads'],
    queryFn: () => adsApi.getAll({ status: 'active' }),
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            <p className="mt-2 text-gray-600">Загрузка объявлений...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center py-8">
            <p className="text-red-600">Ошибка загрузки объявлений</p>
            <p className="text-gray-600 text-sm mt-2">
              {error instanceof Error ? error.message : 'Неизвестная ошибка'}
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (!ads || ads.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center py-8">
            <p className="text-gray-600">Объявлений пока нет</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold mb-4 text-gray-900">Объявления</h1>
        
        {/* Сетка из 2 колонок */}
        <div className="grid grid-cols-2 gap-3">
          {ads.map((ad) => (
            <AdCard key={ad.id} ad={ad} />
          ))}
        </div>
      </div>
    </div>
  );
}

