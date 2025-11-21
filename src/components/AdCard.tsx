import { AdWithRelations } from '../types';

interface AdCardProps {
  ad: AdWithRelations;
  onClick?: () => void;
}

export function AdCard({ ad, onClick }: AdCardProps) {
  const getTelegramPostUrl = (): string | null => {
    // Нужен channel_message_id для формирования ссылки
    if (!ad.channel_message_id || !ad.channel_username) {
      return null;
    }

    const channelName = ad.channel_username.replace('@', '');
    
    // Если есть ID сообщения в группе обсуждений, используем формат с параметром ?comment=
    // Это открывает пост сразу в группе обсуждений на уровне комментариев!
    // Формат: https://t.me/channel_username/channel_message_id?comment=discussion_group_message_id
    if (ad.discussion_group_message_id) {
      return `https://t.me/${channelName}/${ad.channel_message_id}?comment=${ad.discussion_group_message_id}`;
    }
    
    // Если нет discussion_group_message_id, но есть группа обсуждений,
    // пробуем использовать channel_message_id как ID в группе
    if (ad.discussion_group_username) {
      const groupUsername = ad.discussion_group_username.replace('@', '');
      // Пробуем формат с параметром comment, используя channel_message_id
      // Это может сработать, если ID совпадают
      return `https://t.me/${channelName}/${ad.channel_message_id}?comment=${ad.channel_message_id}`;
    }
    
    if (ad.discussion_group_id) {
      // Для приватных групп тоже пробуем формат с comment
      return `https://t.me/${channelName}/${ad.channel_message_id}?comment=${ad.channel_message_id}`;
    }
    
    // Fallback на канал без комментариев
    return `https://t.me/${channelName}/${ad.channel_message_id}`;
  };

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const postUrl = getTelegramPostUrl();
    
    if (!postUrl) {
      if (onClick) {
        onClick();
      }
      return;
    }

    // В Mini App используем openLink для открытия ссылки
    // openLink автоматически сворачивает Mini App и открывает ссылку в Telegram
    // НЕ нужно вызывать close() перед openLink - это может вызвать проблемы на Android
    if (window.Telegram?.WebApp) {
      const tg = window.Telegram.WebApp;
      
      // Используем openLink - он сам закроет Mini App и откроет ссылку
      // Это работает правильно на всех платформах (PC, Android, iOS)
      if (tg.openLink) {
        try {
          tg.openLink(postUrl, { try_instant_view: false });
        } catch (error) {
          console.error('Error opening link:', error);
          // Fallback на window.location.href
          window.location.href = postUrl;
        }
      } else {
        // Fallback, если openLink недоступен
        window.location.href = postUrl;
      }
    } else {
      // Fallback для разработки в браузере
      window.open(postUrl, '_blank');
    }
  };

  const firstImage = ad.images && ad.images.length > 0 
    ? ad.images[0].image_url 
    : 'https://via.placeholder.com/300x200?text=No+Image';

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
      onClick={handleClick}
      className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer border border-gray-200"
    >
      <div className="relative w-full aspect-[4/3] bg-gray-100 overflow-hidden pointer-events-none">
        <img
          src={firstImage}
          alt={ad.title}
          className="w-full h-full object-cover pointer-events-none"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://via.placeholder.com/300x200?text=No+Image';
          }}
        />
      </div>

      <div className="p-3">
        <h3 className="text-sm font-medium text-gray-900 line-clamp-2 mb-2 min-h-[2.5rem]">
          {ad.title}
        </h3>
        <div className="text-lg font-bold text-gray-900">
          {formatPrice(ad.price)}
        </div>
      </div>
    </div>
  );
}

