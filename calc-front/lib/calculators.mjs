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

export function calculateWMConsumption({
    efficiencyClass,
    weeklyLoads,
    loadSize, // Small, Medium, or Large
    electricityCostPerKWh, // вартість електроенергії за 1 кВт·год у копійках
    waterCostPerCubicMeter, // вартість води за 1 кубометр у копійках
    nightRateFactor = 1, // понижуючий коефіцієнт нічного тарифу (необов'язково, за замовчуванням 1)
    ageInYears = 0, // вік пральної машини в роках (за замовчуванням 0)
}) {
    // Константи споживання енергії та води на одне завантаження, залежно від класу ефективності та розміру
    const energyConsumptionPerLoad = {
        "A+++": { small: 0.4, medium: 0.5, large: 0.6 },
        "A++": { small: 0.5, medium: 0.6, large: 0.7 },
        "A+": { small: 0.6, medium: 0.7, large: 0.8 },
        A: { small: 0.7, medium: 0.8, large: 0.9 },
        B: { small: 0.9, medium: 1.0, large: 1.2 },
        C: { small: 1.1, medium: 1.2, large: 1.4 },
    };

    const waterUsagePerLoad = {
        "A+++": { small: 30, medium: 40, large: 50 },
        "A++": { small: 35, medium: 45, large: 55 },
        "A+": { small: 40, medium: 50, large: 60 },
        A: { small: 45, medium: 55, large: 65 },
        B: { small: 50, medium: 60, large: 70 },
        C: { small: 60, medium: 70, large: 80 },
    };

    // Перевірка валідності розміру завантаження
    const validLoadSizes = ["small", "medium", "large"];
    if (!validLoadSizes.includes(loadSize)) {
        throw new Error(`Невірний розмір завантаження. Виберіть один із варіантів: ${validLoadSizes.join(", ")}`);
    }

    // Отримання енергоспоживання та використання води на одне завантаження
    let energyPerLoad =
        energyConsumptionPerLoad[efficiencyClass]?.[loadSize] || energyConsumptionPerLoad.A?.medium; // За замовчуванням A/medium
    let waterPerLoad =
        waterUsagePerLoad[efficiencyClass]?.[loadSize] || waterUsagePerLoad.A?.medium; // За замовчуванням A/medium

    // Зменшення ефективності залежно від віку машини
    const ageFactor = 0.02; // 2% зниження ефективності кожного року
    if (ageInYears > 0) {
        energyPerLoad *= (1 + ageFactor * ageInYears);
        waterPerLoad *= (1 + ageFactor * ageInYears);
    }

    // Розрахунок річної кількості завантажень
    const yearlyLoads = weeklyLoads * 52;

    // Загальне споживання енергії (кВт·год) за рік
    const totalEnergyConsumption = energyPerLoad * yearlyLoads; // в кВт·год

    // Загальна вартість енергії з урахуванням нічного тарифу
    const energyCostYearly = totalEnergyConsumption * electricityCostPerKWh * nightRateFactor; // у копійках

    // Загальне споживання води (літри) за рік
    const totalWaterUsageLiters = waterPerLoad * yearlyLoads; // у літрах
    const totalWaterUsageCubicMeters = totalWaterUsageLiters / 1000; // у кубометрах

    // Вартість води за рік
    const waterCostYearly = totalWaterUsageCubicMeters * waterCostPerCubicMeter; // у копійках

    // Розрахунок параметрів за місяць
    const monthlyLoads = yearlyLoads / 12;
    const energyConsumptionMonthly = totalEnergyConsumption / 12;
    const energyCostMonthly = energyCostYearly / 12;
    const waterUsageLitersMonthly = totalWaterUsageLiters / 12;
    const waterCostMonthly = waterCostYearly / 12;

    // Повертаємо детальну розбивку споживання та витрат
    return {
        yearly: {
            totalEnergyConsumption, // кВт·год/рік
            energyCost: energyCostYearly / 100, // вартість енергії (грн/рік)
            totalWaterUsageLiters, // літри/рік
            waterCost: waterCostYearly / 100, // вартість води (грн/рік)
            totalYearlyCost: (energyCostYearly + waterCostYearly) / 100, // загальна вартість (грн/рік)
        },
        monthly: {
            loads: monthlyLoads, // кількість завантажень за місяць
            energyConsumption: energyConsumptionMonthly, // кВт·год/місяць
            energyCost: energyCostMonthly / 100, // вартість енергії (грн/місяць)
            waterUsageLiters: waterUsageLitersMonthly, // літри/місяць
            waterCost: waterCostMonthly / 100, // вартість води (грн/місяць)
            totalMonthlyCost: (energyCostMonthly + waterCostMonthly) / 100, // загальна вартість (грн/місяць)
        },
    };
}

export function calculateMWConsumption({
    powerRating, // Потужність мікрохвильовки в ватах (W)
    usageTime, // Час використання мікрохвильовки за одне включення (в хвилинах)
    dailyUsage, // Кількість використань мікрохвильовки на день
    electricityCostPerKWh, // Вартість електроенергії за 1 кВт·год у копійках
    nightRateFactor = 1, // Знижка на нічний тариф
    ageInYears = 0, // Вік мікрохвильовки в роках (за замовчуванням 0)
    daysPerMonth = 30, // Кількість днів у місяці (за замовчуванням 30)
}) {
    // Конвертуємо потужність в кВт (1 кВт = 1000 Вт)
    const powerInKW = powerRating / 1000;

    // Переводимо час використання з хвилин в години
    const usageInHours = usageTime / 60;

    // Якщо є вік мікрохвильовки, враховуємо зниження ефективності
    const efficiencyFactor = ageInYears > 0 ? Math.max(0.9 - (ageInYears * 0.02), 0.5) : 1; // Знижка на ефективність (по 2% на рік)

    // Річне споживання енергії (кВт·год) = потужність в кВт * час використання в годинах * кількість використань на день * кількість днів на місяць
    const monthlyEnergyConsumption = powerInKW * usageInHours * dailyUsage * daysPerMonth * efficiencyFactor;

    // Річна вартість енергії
    const yearlyEnergyConsumption = monthlyEnergyConsumption * 12; // В рік

    const monthlyEnergyCost = monthlyEnergyConsumption * electricityCostPerKWh * nightRateFactor;
    const yearlyEnergyCost = yearlyEnergyConsumption * electricityCostPerKWh * nightRateFactor;

    return {
        yearly: {
            energyConsumption: yearlyEnergyConsumption, // кВт·год/рік
            energyCost: yearlyEnergyCost / 100, // Вартість енергії (грн/рік)
        },
        monthly: {
            energyConsumption: monthlyEnergyConsumption, // кВт·год/місяць
            energyCost: monthlyEnergyCost / 100, // Вартість енергії (грн/місяць)
        },
    };
}

export function calculateLightingConsumption({
    wattage, // Потужність лампочки в ватах (W)
    hoursPerDay, // Кількість годин роботи лампочки на день
    numberOfBulbs, // Кількість лампочек
    electricityCostPerKWh, // Вартість електроенергії за 1 кВт·год у копійках
    nightRateFactor = 1, // Знижка на нічний тариф
    daysPerMonth = 30, // Кількість днів у місяці
}) {
    // Переводимо потужність в кВт (1 кВт = 1000 Вт)
    const powerInKW = wattage / 1000;

    // Переводимо час використання з годин в добу
    const usageInHours = hoursPerDay;

    // Річне споживання енергії (кВт·год) = потужність в кВт * час використання в годинах * кількість використань на день * кількість днів на місяць
    const monthlyEnergyConsumption = powerInKW * usageInHours * numberOfBulbs * daysPerMonth;

    // Річна вартість енергії
    const yearlyEnergyConsumption = monthlyEnergyConsumption * 12; // В рік

    const monthlyEnergyCost = monthlyEnergyConsumption * electricityCostPerKWh * nightRateFactor;
    const yearlyEnergyCost = yearlyEnergyConsumption * electricityCostPerKWh * nightRateFactor;

    return {
        yearly: {
            energyConsumption: yearlyEnergyConsumption, // кВт·год/рік
            energyCost: yearlyEnergyCost / 100, // Вартість енергії (грн/рік)
        },
        monthly: {
            energyConsumption: monthlyEnergyConsumption, // кВт·год/місяць
            energyCost: monthlyEnergyCost / 100, // Вартість енергії (грн/місяць)
        },
    };
}
