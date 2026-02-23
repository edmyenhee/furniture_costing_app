export function calcVolumePerUnit(length, width, height) {
  return length * width * height;
}

export function calcLogisticPerUnit(volumePerUnit, rmPerM3) {
  return volumePerUnit * rmPerM3;
}

export function calcTotalVolume(volumePerUnit, qty, compressVolume) {
  if (compressVolume != null && compressVolume !== '') {
    return Number(compressVolume) * qty;
  }
  return volumePerUnit * qty;
}

export function calcTotalLogistic(totalVolume, rmPerM3) {
  return totalVolume * rmPerM3;
}

export function calcMinPrice(costPrice, logPerUnit, minMultiplier) {
  return (costPrice + logPerUnit) * minMultiplier;
}

export function calcMaxPrice(costPrice, logPerUnit, maxMultiplier) {
  return (costPrice + logPerUnit) * maxMultiplier;
}

export function calcItemTotals(item, rmPerM3, minMultiplier, maxMultiplier) {
  return item.materials.map(mat => {
    const vol = calcVolumePerUnit(Number(mat.length), Number(mat.width), Number(mat.height));
    const logPerUnit = calcLogisticPerUnit(vol, rmPerM3);
    const totalVol = calcTotalVolume(vol, Number(mat.qty), mat.compressVolume);
    const totalLog = calcTotalLogistic(totalVol, rmPerM3);
    const cost = Number(mat.costPrice);
    const minPrice = calcMinPrice(cost, logPerUnit, minMultiplier);
    const maxPrice = calcMaxPrice(cost, logPerUnit, maxMultiplier);
    return {
      ...mat,
      volPerUnit: vol,
      logPerUnit,
      totalVol,
      totalLogistic: totalLog,
      minPricePerUnit: minPrice,
      maxPricePerUnit: maxPrice,
      totalMinPrice: minPrice * Number(mat.qty),
      totalMaxPrice: maxPrice * Number(mat.qty),
    };
  });
}
