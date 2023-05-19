import { PredictionItem } from '../types';

interface PredictionDataDetail {
  quantity: number;
  dayOfWeek: Record<string | number, number>;
  month: Record<string | number, number>;
  isHoliday: Record<string | number, number>;
  isWeekend: Record<string | number, number>;
  date: Record<string | number, number>;
}

export const decomposePrediction = (predictionItems: PredictionItem[]) => {
  return predictionItems.reduce((res: any, predictionItem) => {
    if (!('all' in res))
      res['all'] = {
        quantity: 0,
        dayOfWeek: {},
        isHoliday: {},
        isWeekend: {},
        month: {},
        date: {},
      } as Partial<PredictionDataDetail>;

    if (!(predictionItem.Nama in res))
      res[predictionItem.Nama] = {
        quantity: 0,
        dayOfWeek: {},
        isHoliday: {},
        isWeekend: {},
        month: {},
        date: {},
      } as Partial<PredictionDataDetail>;

    res['all'].quantity += Math.max(0, predictionItem.Quantity);
    res['all'].dayOfWeek[predictionItem.Hari] =
      (res['all'].dayOfWeek[predictionItem.Hari] || 0) +
      Math.max(0, predictionItem.Quantity);
    res['all'].isHoliday[predictionItem['Hari Libur']] =
      (res['all'].isHoliday[predictionItem['Hari Libur']] || 0) +
      Math.max(0, predictionItem.Quantity);
    res['all'].isWeekend[predictionItem.Weekend] =
      (res['all'].isWeekend[predictionItem.Weekend] || 0) +
      Math.max(0, predictionItem.Quantity);
    res['all'].month[predictionItem.Bulan] =
      (res['all'].month[predictionItem.Bulan] || 0) +
      Math.max(0, predictionItem.Quantity);
    res['all'].date[predictionItem.Tanggal] =
      (res['all'].date[predictionItem.Tanggal] || 0) +
      Math.max(0, predictionItem.Quantity);

    res[predictionItem.Nama].quantity += Math.max(0, predictionItem.Quantity);
    res[predictionItem.Nama].dayOfWeek[predictionItem.Hari] =
      (res[predictionItem.Nama].dayOfWeek[predictionItem.Hari] || 0) +
      Math.max(0, predictionItem.Quantity);
    res[predictionItem.Nama].isHoliday[predictionItem['Hari Libur']] =
      (res[predictionItem.Nama].isHoliday[predictionItem['Hari Libur']] || 0) +
      Math.max(0, predictionItem.Quantity);
    res[predictionItem.Nama].isWeekend[predictionItem.Weekend] =
      (res[predictionItem.Nama].isWeekend[predictionItem.Weekend] || 0) +
      Math.max(0, predictionItem.Quantity);
    res[predictionItem.Nama].month[predictionItem.Bulan] =
      (res[predictionItem.Nama].month[predictionItem.Bulan] || 0) +
      Math.max(0, predictionItem.Quantity);
    res[predictionItem.Nama].date[predictionItem.Tanggal] = Math.max(
      0,
      predictionItem.Quantity
    );

    return res;
  }, {});
};
