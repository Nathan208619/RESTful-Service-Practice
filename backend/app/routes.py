import pandas as pd

def parse_csv_and_plan(filename):
    df = pd.read_csv(filename)

    # Build stock list (length repeated by count)
    stock_rods = []
    for _, row in df[df['type'] == 'stock'].iterrows():
        stock_rods.extend([row['length']] * row['count'])

    # Build demand list (length repeated by count)
    demand_list = []
    for _, row in df[df['type'] == 'demand'].iterrows():
        demand_list.extend([row['length']] * row['count'])

    # Sort
    stock_rods.sort(reverse=True)
    demand_list.sort(reverse=True)

    # Assign cuts
    result = []
    for rod in stock_rods:
        cuts = []
        remaining = rod
        i = 0
        while i < len(demand_list):
            if demand_list[i] <= remaining:
                cuts.append(demand_list[i])
                remaining -= demand_list[i]
                demand_list.pop(i)
            else:
                i += 1
        result.append({
            "stock_length": rod,
            "cuts": cuts,
            "waste": remaining
        })
        if not demand_list:
            break

    return result, demand_list


parse_csv_and_plan("rods.csv")