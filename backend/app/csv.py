from flask import Blueprint, jsonify, request
import pandas as pd
from collections import defaultdict


csv_bp = Blueprint("csv", __name__)

@csv_bp.route("/api/department_salary")
def sort_by_department_salary():
    df = pd.read_csv("dataset.csv")

    # sorted_df = df.sort_values(by="salary")
    # return jsonify(sorted_df.to_dict(orient="records"))

    df_multi_sorted = df.sort_values(by=["department", "salary"], ascending=[True, False]);
    return jsonify(df_multi_sorted.to_dict(orient="records"))


@csv_bp.route("/api/employees/engineers")
def get_engineering_employees():
    df = pd.read_csv("dataset.csv")
    

@csv_bp.route("/api/employees")
def get_employees():
    sort_by = request.args.get("sort_by", "salary")
    
    try:
        # Read the CSV file
        df = pd.read_csv("dataset.csv")
        
        # Check if column exists before sorting
        if sort_by not in df.columns:
            return jsonify({"error": f"Invalid sort column: {sort_by}"}), 400
        
        # Sort the data
        sorted_df = df.sort_values(by=sort_by)

        if sort_by == "salary":
            sorted_df = df.sort_values(by=sort_by, ascending=False)

        # Convert to list of dicts
        return jsonify(sorted_df.to_dict(orient="records"))
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    

@csv_bp.route("/api/parts")
def get_parts():
    sort_by = request.args.get("sort_by", "model_id")
    
    try:
        # Read the CSV file
        df = pd.read_csv("parts.csv")
        
        # Check if column exists before sorting
        if sort_by not in df.columns:
            return jsonify({"error": f"Invalid sort column: {sort_by}"}), 400
        
        # Sort the data

        filter_fields = ["category", "preload_class",]
        for field in filter_fields:
            value = request.args.get(field)
            if value:
                print(f"Filtering {field} = {value}")
                df = df[df[field] == value]

        sorted_df = df.sort_values(by=sort_by)

        # Convert to list of dicts
        return jsonify(sorted_df.to_dict(orient="records"))
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    

@csv_bp.route("/api/cut-plan")
def cut_plan():
    try:
        df = pd.read_csv("rods.csv")

        stock_rods = []
        for _, row in df[df['type'] == 'stock'].iterrows():
            stock_rods.extend([row['length']] * row['count'])

        demand = []
        for _, row in df[df['type'] == 'demand'].iterrows():
            demand.extend([row['length']] * row['count'])

        stock_rods.sort(reverse=True)
        demand.sort(reverse=True)

        result = []
        for rod in stock_rods:
            cuts = []
            remaining = rod
            i = 0
            while i < len(demand):
                if demand[i] <= remaining:
                    cuts.append(demand[i])
                    remaining -= demand[i]
                    demand.pop(i)
                else:
                    i += 1
            result.append({
                "stock_length": rod,
                "cuts": cuts,
                "waste": remaining
            })

            if not demand:
                break

        response = {
            "cut_plan": result,
            "unfulfilled": demand
        }

        return jsonify(response)

    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@csv_bp.route("/api/job-assignments")
def assign_jobs():
    machines_df = pd.read_csv("machines.csv")
    jobs_df = pd.read_csv("jobs.csv")

    # Parse machine capabilities
    machine_capabilities = {}
    for _, row in machines_df.iterrows():
        lengths = [int(l) for l in row['capable_lengths'].split("|")]
        machine_capabilities[row['machine_id']] = lengths

    # Track machine load
    machine_load = defaultdict(int)
    assignments = []

    for _, job in jobs_df.iterrows():
        job_id = job["job_id"]
        length = job["length"]
        qty = job["quantity"]

        # Find eligible machines
        eligible = []
        for machine_id, capable_lengths in machine_capabilities.items():
            if length in capable_lengths:
                eligible.append(machine_id)

        if not eligible:
            assignments.append({
                "job_id": job_id,
                "length": length,
                "quantity": qty,
                "assigned_machine": None,
                "note": "No capable machine"
            })
            continue

        # Choose machine with lowest load
        best_machine = None
        lowest_load = float("inf")


        for m in eligible:
            if machine_load[m] < lowest_load:
                lowest_load = machine_load[m]
                best_machine = m

        # Update load and record assignment
        machine_load[best_machine] += qty

        assignments.append({
            "job_id": job_id,
            "length": length,
            "quantity": qty,
            "assigned_machine": best_machine
        })

    return jsonify(assignments)

if __name__ == "__main__":
    app.run(debug=True)
