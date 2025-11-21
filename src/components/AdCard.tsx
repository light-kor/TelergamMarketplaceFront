import { AdWithRelations } from '../types';

interface AdCardProps {
  ad: AdWithRelations;
  onClick?: () => void;
}

export function AdCard({ ad, onClick }: AdCardProps) {
  const getTelegramPostUrl = (): string | null => {
    if (!ad.channel_message_id) {
      return null;
    }

    if (ad.discussion_group_id) {
      // Формат для открытия поста в группе обсуждений: https://t.me/c/GROUP_ID/MESSAGE_ID
      const groupId = Math.abs(ad.discussion_group_id);
      return `https://t.me/c/${groupId}/${ad.channel_message_id}`;
    }
    
    if (ad.channel_username) {
      const channelName = ad.channel_username.replace('@', '');
      return `https://t.me/${channelName}/${ad.channel_message_id}`;
    }
    
    return null;
  };

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const postUrl = getTelegramPostUrl();
    
    if (postUrl) {
      if (window.Telegram?.WebApp?.openLink) {
        try {
          window.Telegram.WebApp.openLink(postUrl, { try_instant_view: false });
        } catch (error) {
          console.error('Error opening link:', error);
          window.location.href = postUrl;
        }
      } else {
        // Fallback для разработки
        if (ad.channel_username && ad.channel_message_id) {
          const channelName = ad.channel_username.replace('@', '');
          window.open(`https://t.me/${channelName}/${ad.channel_message_id}`, '_blank');
        }
      }
    } else if (onClick) {
      onClick();
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

