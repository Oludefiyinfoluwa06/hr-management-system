interface StatCardProps {
    title: string;
    value: string | number;
    trend?: {
        value: number;
        isPositive: boolean;
    };
}

export function StatCard({ title, value, trend }: StatCardProps) {
    return (
        <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm">
            <h3 className="text-gray-600 text-xs md:text-sm">{title}</h3>
            <div className="mt-1 md:mt-2 flex items-end gap-1 md:gap-2">
                <div className="text-xl md:text-2xl font-bold text-gray-900">{value}</div>
                {trend && (
                    <div className={`text-xs md:text-sm ${trend.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                        {trend.isPositive ? '+' : '-'}{Math.abs(trend.value)}%
                    </div>
                )}
            </div>
        </div>
    );
}
