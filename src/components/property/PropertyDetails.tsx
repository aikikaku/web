import { Property } from '@/types/microcms';

interface PropertyDetailsProps {
  property: Property;
}

function getPropertyFields(
  type: 'sell' | 'rent',
  category: 'property' | 'land',
  property: Property
): { label: string; value: string | undefined }[] {
  const common = [
    { label: '所在地', value: property.location },
    { label: '最寄駅', value: property.nearestStation },
    {
      label: '種別',
      value: property.label || `${type === 'sell' ? '売' : '貸'}${category === 'property' ? '物件' : '土地'}`,
    },
  ];

  if (type === 'sell' && category === 'property') {
    return [
      ...common,
      { label: '土地面積', value: property.landArea ? `${property.landArea}m²` : undefined },
      { label: '間取り', value: property.layout },
      { label: '築年月', value: property.constructionDate },
      { label: '学区', value: property.schoolDistrict },
      { label: '取引態様', value: property.transactionType },
      { label: '価格', value: property.price ? `${property.price.toLocaleString()}万円` : undefined },
      { label: '備考', value: property.remarks },
    ];
  }

  if (type === 'sell' && category === 'land') {
    return [
      ...common,
      { label: '土地面積', value: property.landArea ? `${property.landArea}m²` : undefined },
      { label: '学区', value: property.schoolDistrict },
      { label: '取引態様', value: property.transactionType },
      { label: '価格', value: property.price ? `${property.price.toLocaleString()}万円` : undefined },
      { label: '備考', value: property.remarks },
    ];
  }

  if (type === 'rent' && category === 'property') {
    return [
      ...common,
      { label: '建物面積', value: property.buildingArea ? `${property.buildingArea}m²` : undefined },
      { label: '間取り', value: property.layout },
      { label: '築年月', value: property.constructionDate },
      { label: '学区', value: property.schoolDistrict },
      { label: '取引態様', value: property.transactionType },
      { label: '賃料', value: property.rent ? `${property.rent.toLocaleString()}円/月` : undefined },
      { label: '備考', value: property.remarks },
    ];
  }

  // rent + land
  return [
    ...common,
    { label: '土地面積', value: property.landArea ? `${property.landArea}m²` : undefined },
    { label: '学区', value: property.schoolDistrict },
    { label: '取引態様', value: property.transactionType },
    { label: '賃料', value: property.rent ? `${property.rent.toLocaleString()}円/月` : undefined },
    { label: '備考', value: property.remarks },
  ];
}

export default function PropertyDetails({ property }: PropertyDetailsProps) {
  const fields = getPropertyFields(property.type, property.category, property);

  return (
    <div className="mt-8">
      <h2 className="font-mincho text-2xl mb-6 tracking-wider">物件概要</h2>
      <table className="w-full border-collapse">
        <tbody>
          {fields.map(
            (field) =>
              field.value && (
                <tr key={field.label} className="border-b border-gray-200">
                  <th className="py-4 px-4 text-left bg-cream w-1/4 text-body-s font-gothic font-medium text-gray-600">
                    {field.label}
                  </th>
                  <td className="py-4 px-4 text-body-s">{field.value}</td>
                </tr>
              )
          )}
        </tbody>
      </table>
    </div>
  );
}
