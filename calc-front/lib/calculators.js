export function calculateBoilerEnergyConsumption(
    waterVolume,
    initialTemp,
    targetTemp,
    efficiency,
    costPerKWh,
    hotWaterCostPerCubicMeter,
    coldWaterCostPerCubicMeter,
    subscriptionFee,
    nightRateFactor = 1
) {
    // waterVolume - кількість води в літрах
    // initialTemp - початкова температура води (°C)
    // targetTemp - кінцева температура води (°C)
    // efficiency - ефективність бойлера у відсотках (0-100), необов'язково, за замовчуванням 100%
    // costPerKWh - вартість 1 кВт·год у копійках
    // hotWaterCostPerCubicMeter - вартість 1 кубометра гарячої води з мережі
    // coldWaterCostPerCubicMeter - вартість 1 кубометра холодної води
    // subscriptionFee - абонентська плата за місяць
    // nightRateFactor - понижуючий коефіцієнт нічного тарифу (необов'язково, за замовчуванням 1)

    // Теплоємність води = 4.186 кДж/кг·°C
    const specificHeatWater = 4.186; // кДж/кг·°C
    const waterDensity = 1; // щільність води = 1 кг/л

    // Масу води можна обчислити як: маса (кг) = об'єм (л)
    const massOfWater = waterVolume * waterDensity;

    // Температурна різниця
    const temperatureDifference = targetTemp - initialTemp;

    // Енергія, необхідна для нагріву води (кДж) = маса * теплоємність * ΔT
    const energyRequiredKJ = massOfWater * specificHeatWater * temperatureDifference;

    // Переведемо енергію з кДж у кВт·год (1 кВт·год = 3600 кДж)
    const energyRequiredKWh = energyRequiredKJ / 3600;

    // Враховуємо ефективність бойлера (якщо є)
    const efficiencyFactor = efficiency ? efficiency / 100 : 1;

    // Загальне енергоспоживання з урахуванням ефективності
    const totalEnergyConsumption = energyRequiredKWh / efficiencyFactor;

    // Вартість з урахуванням нічного тарифу
    const totalCost = totalEnergyConsumption * costPerKWh * nightRateFactor;

    // Об'єм води в кубометрах (1 кубометр = 1000 літрів)
    const waterVolumeInCubicMeters = waterVolume / 1000;

    // Вартість води з мережі гарячого водопостачання
    const networkHotWaterCost = waterVolumeInCubicMeters * hotWaterCostPerCubicMeter + subscriptionFee;

    // Вартість холодної води
    const coldWaterCost = waterVolumeInCubicMeters * coldWaterCostPerCubicMeter;

    // Додаємо абонентську плату до загальної вартості
    const totalCostWithSubscription = (totalCost + coldWaterCost) / 100;

    return {
        energyConsumption: totalEnergyConsumption, // кВт*год
        totalCostInUAH: totalCostWithSubscription, // вартість нагріву бойлером з холодною водою та абонентською платою у гривнях
        networkHotWaterCostInUAH: networkHotWaterCost / 100, // вартість гарячої води з мережі у гривнях
    };
}

// Викликаємо для літнього періоду (температура холодної води = 15°C)
function calculateForSummer(
    waterVolume,
    targetTemp,
    efficiency,
    costPerKWh,
    hotWaterCostPerCubicMeter,
    coldWaterCostPerCubicMeter,
    subscriptionFee,
    nightRateFactor = 1
) {
    const initialTemp = 15; // Початкова температура води влітку (°C)
    return calculateBoilerEnergyConsumption(
        waterVolume,
        initialTemp,
        targetTemp,
        efficiency,
        costPerKWh,
        hotWaterCostPerCubicMeter,
        coldWaterCostPerCubicMeter,
        subscriptionFee,
        nightRateFactor
    );
}

// Викликаємо для зимового періоду (температура холодної води = 5°C)
function calculateForWinter(
    waterVolume,
    targetTemp,
    efficiency,
    costPerKWh,
    hotWaterCostPerCubicMeter,
    coldWaterCostPerCubicMeter,
    subscriptionFee,
    nightRateFactor = 1
) {
    const initialTemp = 5; // Початкова температура води взимку (°C)
    return calculateBoilerEnergyConsumption(
        waterVolume,
        initialTemp,
        targetTemp,
        efficiency,
        costPerKWh,
        hotWaterCostPerCubicMeter,
        coldWaterCostPerCubicMeter,
        subscriptionFee,
        nightRateFactor
    );
}

// Приклад використання для літа та зими:
const waterVolume = 3000; // Об'єм води у літрах
const targetTemp = 60; // Кінцева температура води (°C)
const efficiency = 90; // Ефективність бойлера у відсотках
const costPerKWh = 432; // Вартість 1 кВт*год у копійках
const hotWaterCostPerCubicMeter = 9789; // Вартість 1 кубометра гарячої води з мережі у копійках
const coldWaterCostPerCubicMeter = 1345; // Вартість 1 кубометра холодної води у копійках
const subscriptionFee = 4294; // Абонентська плата за місяць (у копійках)
const nightRateFactor = 0.5; // Нічний тариф (наприклад, 50% від стандартного)

// Розрахунок для літа
const summerResult = calculateForSummer(
    waterVolume,
    targetTemp,
    efficiency,
    costPerKWh,
    hotWaterCostPerCubicMeter,
    coldWaterCostPerCubicMeter,
    subscriptionFee,
    nightRateFactor
);
console.log(
    `Літнє енергоспоживання для нагрівання води: ${summerResult.energyConsumption.toFixed(2)} кВт*год`
);
console.log(
    `Літня загальна вартість нагріву бойлером: ${summerResult.totalCostInUAH.toFixed(2)} грн`
);
console.log(
    `Літня вартість гарячої води з мережі: ${summerResult.networkHotWaterCostInUAH.toFixed(2)} грн`
);

// Розрахунок для зими
const winterResult = calculateForWinter(
    waterVolume,
    targetTemp,
    efficiency,
    costPerKWh,
    hotWaterCostPerCubicMeter,
    coldWaterCostPerCubicMeter,
    subscriptionFee,
    nightRateFactor
);
console.log(
    `Зимове енергоспоживання для нагрівання води: ${winterResult.energyConsumption.toFixed(2)} кВт*год`
);
console.log(
    `Зимова загальна вартість нагріву бойлером: ${winterResult.totalCostInUAH.toFixed(2)} грн`
);
console.log(
    `Зимова вартість гарячої води з мережі: ${winterResult.networkHotWaterCostInUAH.toFixed(2)} грн`
);