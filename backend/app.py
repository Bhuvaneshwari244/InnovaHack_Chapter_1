from flask import Flask, request, jsonify, Response
from flask_cors import CORS
from datetime import datetime, timedelta
import json
import random
import io
import csv

app = Flask(__name__)
CORS(app)

# Transaction categories and keywords
CATEGORIES = {
    'Food & Dining': ['restaurant', 'cafe', 'food', 'pizza', 'burger', 'starbucks', 'mcdonald', 'subway', 'domino'],
    'Transportation': ['uber', 'lyft', 'gas', 'fuel', 'parking', 'metro', 'taxi', 'transit'],
    'Shopping': ['amazon', 'walmart', 'target', 'mall', 'store', 'shop', 'retail'],
    'Entertainment': ['netflix', 'spotify', 'movie', 'theater', 'game', 'concert', 'youtube', 'gym'],
    'Bills & Utilities': ['electric', 'water', 'internet', 'phone', 'utility', 'bill', 'rent'],
    'Healthcare': ['pharmacy', 'doctor', 'hospital', 'clinic', 'medical', 'health'],
    'Education': ['course', 'book', 'tuition', 'school', 'university', 'udemy'],
    'Others': []
}

def categorize_transaction(description):
    """Automatically categorize transaction based on description"""
    description_lower = description.lower()
    for category, keywords in CATEGORIES.items():
        for keyword in keywords:
            if keyword in description_lower:
                return category
    return 'Others'

def calculate_roundup(amount):
    """Calculate round-up amount"""
    import math
    return math.ceil(amount) - amount

def generate_sample_transactions():
    """Generate sample transactions for demo"""
    merchants = [
        'Starbucks Coffee', 'Uber Ride', 'Amazon Purchase', 'Netflix Subscription',
        'Local Restaurant', 'Gas Station', 'Walmart', 'Target', 'Spotify Premium',
        'Electric Bill', 'Internet Bill', 'Pharmacy', 'Movie Theater', 'Dominos Pizza',
        'Fitness Gym Membership', 'Udemy Course', 'Subway Sandwich'
    ]
    
    transactions = []
    start_date = datetime.now() - timedelta(days=90)
    
    for i in range(50):
        date = start_date + timedelta(days=random.randint(0, 90))
        merchant = random.choice(merchants)
        amount = round(random.uniform(5, 150), 2)
        category = categorize_transaction(merchant)
        
        # Tag potential business/tax deductible items
        is_tax_deductible = category in ['Education', 'Transportation', 'Bills & Utilities'] or 'course' in merchant.lower() or 'internet' in merchant.lower()
        
        transaction = {
            'id': i + 1,
            'date': date.strftime('%Y-%m-%d'),
            'description': merchant,
            'amount': amount,
            'category': category,
            'roundup': round(calculate_roundup(amount), 2),
            'tax_deductible': is_tax_deductible
        }
        transactions.append(transaction)
    
    # Sort by date descending
    transactions.sort(key=lambda x: x['date'], reverse=True)
    return transactions

# In-memory Databases
transactions_db = generate_sample_transactions()

budgets_db = {
    'Food & Dining': 400.0,
    'Transportation': 200.0,
    'Shopping': 350.0,
    'Entertainment': 150.0,
    'Bills & Utilities': 300.0,
    'Healthcare': 100.0,
    'Education': 100.0,
    'Others': 150.0
}

goals_db = [
    {
        'id': 1,
        'title': 'Emergency Fund',
        'target_amount': 1000.0,
        'current_amount': 450.0,
        'target_date': '2026-12-31',
        'icon': '🛡️'
    },
    {
        'id': 2,
        'title': 'Tech Upgrade & Laptop',
        'target_amount': 1500.0,
        'current_amount': 620.0,
        'target_date': '2026-10-15',
        'icon': '💻'
    },
    {
        'id': 3,
        'title': 'Holiday Vacation',
        'target_amount': 800.0,
        'current_amount': 310.0,
        'target_date': '2026-11-20',
        'icon': '✈️'
    }
]

portfolio_allocation_db = {
    'S&P 500 Index Fund': 50,
    'Tech Growth ETF': 25,
    'Crypto (BTC/ETH)': 15,
    'Physical Gold & Commodities': 10
}

@app.route('/api/transactions', methods=['GET'])
def get_transactions():
    """Get all transactions"""
    return jsonify({
        'success': True,
        'transactions': transactions_db,
        'total_transactions': len(transactions_db)
    })

@app.route('/api/transactions', methods=['POST'])
def add_transaction():
    """Add a new transaction"""
    data = request.json
    amount = float(data['amount'])
    desc = data['description']
    category = categorize_transaction(desc)
    
    transaction = {
        'id': len(transactions_db) + 1,
        'date': data.get('date', datetime.now().strftime('%Y-%m-%d')),
        'description': desc,
        'amount': amount,
        'category': category,
        'roundup': round(calculate_roundup(amount), 2),
        'tax_deductible': category in ['Education', 'Transportation', 'Bills & Utilities']
    }
    
    transactions_db.insert(0, transaction)
    
    return jsonify({
        'success': True,
        'transaction': transaction,
        'message': 'Transaction added successfully'
    })

@app.route('/api/analytics/summary', methods=['GET'])
def get_summary():
    """Get spending summary and analytics"""
    total_spent = sum(t['amount'] for t in transactions_db)
    total_roundup = sum(t['roundup'] for t in transactions_db)
    
    category_totals = {}
    for t in transactions_db:
        cat = t['category']
        category_totals[cat] = category_totals.get(cat, 0) + t['amount']
    
    monthly_spending = {}
    for t in transactions_db:
        month = t['date'][:7]
        monthly_spending[month] = monthly_spending.get(month, 0) + t['amount']
    
    top_category = max(category_totals.items(), key=lambda x: x[1]) if category_totals else ('Others', 0)
    avg_transaction = total_spent / len(transactions_db) if transactions_db else 0
    
    return jsonify({
        'success': True,
        'summary': {
            'total_spent': round(total_spent, 2),
            'total_roundup': round(total_roundup, 2),
            'total_transactions': len(transactions_db),
            'avg_transaction': round(avg_transaction, 2),
            'category_breakdown': category_totals,
            'monthly_spending': monthly_spending,
            'top_category': {
                'name': top_category[0],
                'amount': round(top_category[1], 2),
                'percentage': round((top_category[1] / total_spent * 100) if total_spent > 0 else 0, 1)
            }
        }
    })

@app.route('/api/analytics/investments', methods=['GET'])
def get_investments():
    """Calculate simulated investment growth"""
    return_rate = float(request.args.get('rate', 8.0)) / 100.0
    total_roundup = sum(t['roundup'] for t in transactions_db)
    
    months = 3
    monthly_return = return_rate / 12
    
    growth_data = []
    principal = 0
    
    for month in range(1, months + 1):
        monthly_contribution = total_roundup / months
        principal += monthly_contribution
        interest = principal * monthly_return
        total = principal + interest
        
        growth_data.append({
            'month': f'Month {month}',
            'principal': round(principal, 2),
            'interest': round(interest, 2),
            'total': round(total, 2)
        })
    
    final_balance = growth_data[-1]['total'] if growth_data else 0
    total_interest = final_balance - total_roundup
    
    return jsonify({
        'success': True,
        'investment': {
            'total_saved': round(total_roundup, 2),
            'current_balance': round(final_balance, 2),
            'total_interest': round(total_interest, 2),
            'return_rate': round(return_rate * 100, 1),
            'growth_timeline': growth_data,
            'projected_annual': round(final_balance * 4 * (1 + return_rate), 2)
        }
    })

@app.route('/api/insights', methods=['GET'])
def get_insights():
    """Generate actionable spending insights"""
    insights = []
    category_totals = {}
    for t in transactions_db:
        cat = t['category']
        category_totals[cat] = category_totals.get(cat, 0) + t['amount']
    
    total_spent = sum(category_totals.values())
    
    if category_totals:
        top_cat = max(category_totals.items(), key=lambda x: x[1])
        percentage = (top_cat[1] / total_spent * 100) if total_spent > 0 else 0
        insights.append({
            'type': 'category',
            'title': 'Top Spending Category',
            'message': f'You spent {percentage:.1f}% (${top_cat[1]:.2f}) on {top_cat[0]} in the last 90 days.',
            'actionable': f'Consider reducing {top_cat[0]} expenses by 10% to save ${top_cat[1] * 0.1:.2f}/quarter.'
        })
    
    total_roundup = sum(t['roundup'] for t in transactions_db)
    insights.append({
        'type': 'savings',
        'title': 'Micro-Investment Impact',
        'message': f'You\'ve saved ${total_roundup:.2f} through round-ups in 90 days.',
        'actionable': f'At this rate, you\'ll save ${total_roundup * 4:.2f} annually without noticing!'
    })
    
    avg_transaction = total_spent / len(transactions_db) if transactions_db else 0
    insights.append({
        'type': 'spending',
        'title': 'Average Transaction',
        'message': f'Your average transaction is ${avg_transaction:.2f}.',
        'actionable': 'Small purchases add up! Track daily spending to identify saving opportunities.'
    })
    
    subscriptions = [t for t in transactions_db if 'subscription' in t['description'].lower() or 'netflix' in t['description'].lower() or 'spotify' in t['description'].lower() or 'gym' in t['description'].lower()]
    if subscriptions:
        sub_total = sum(s['amount'] for s in subscriptions)
        insights.append({
            'type': 'subscription',
            'title': 'Subscription Services',
            'message': f'You spent ${sub_total:.2f} across recurring subscriptions.',
            'actionable': 'Review recurring subscriptions. Canceling unused services could boost your monthly savings by $15-30.'
        })
    
    return jsonify({
        'success': True,
        'insights': insights,
        'total_insights': len(insights)
    })

# --- ADVANCED FEATURE ENDPOINTS ---

@app.route('/api/budgets', methods=['GET', 'POST'])
def handle_budgets():
    if request.method == 'POST':
        data = request.json
        category = data.get('category')
        limit = float(data.get('limit', 0))
        if category in CATEGORIES:
            budgets_db[category] = limit
            return jsonify({'success': True, 'message': f'Budget updated for {category}'})
        return jsonify({'success': False, 'message': 'Invalid category'}), 400

    category_spent = {}
    for t in transactions_db:
        cat = t['category']
        category_spent[cat] = category_spent.get(cat, 0) + t['amount']

    result = []
    for cat, limit in budgets_db.items():
        spent = category_spent.get(cat, 0.0)
        percentage = round((spent / limit * 100) if limit > 0 else 0, 1)
        result.append({
            'category': cat,
            'limit': round(limit, 2),
            'spent': round(spent, 2),
            'remaining': round(limit - spent, 2),
            'percentage': percentage,
            'status': 'exceeded' if spent > limit else ('warning' if percentage >= 85 else 'normal')
        })

    return jsonify({'success': True, 'budgets': result})

@app.route('/api/goals', methods=['GET', 'POST'])
def handle_goals():
    if request.method == 'POST':
        data = request.json
        new_goal = {
            'id': len(goals_db) + 1,
            'title': data['title'],
            'target_amount': float(data['target_amount']),
            'current_amount': float(data.get('current_amount', 0.0)),
            'target_date': data.get('target_date', '2026-12-31'),
            'icon': data.get('icon', '🎯')
        }
        goals_db.append(new_goal)
        return jsonify({'success': True, 'goal': new_goal})

    total_roundup = sum(t['roundup'] for t in transactions_db)
    enhanced_goals = []
    for g in goals_db:
        progress = round((g['current_amount'] / g['target_amount'] * 100), 1) if g['target_amount'] > 0 else 0
        enhanced_goals.append({
            **g,
            'progress': min(progress, 100.0),
            'remaining': round(max(g['target_amount'] - g['current_amount'], 0), 2)
        })

    return jsonify({'success': True, 'goals': enhanced_goals, 'total_roundup_savings': round(total_roundup, 2)})

@app.route('/api/subscriptions', methods=['GET'])
def get_subscriptions():
    keywords = ['netflix', 'spotify', 'gym', 'internet', 'phone', 'electric', 'youtube', 'prime', 'membership', 'subscription']
    detected = {}

    for t in transactions_db:
        desc_lower = t['description'].lower()
        for kw in keywords:
            if kw in desc_lower:
                if t['description'] not in detected:
                    detected[t['description']] = {
                        'name': t['description'],
                        'amount': t['amount'],
                        'category': t['category'],
                        'frequency': 'Monthly',
                        'last_paid': t['date'],
                        'annual_cost': round(t['amount'] * 12, 2)
                    }

    subs_list = list(detected.values())
    total_monthly = sum(s['amount'] for s in subs_list)
    total_annual = sum(s['annual_cost'] for s in subs_list)

    return jsonify({
        'success': True,
        'subscriptions': subs_list,
        'total_monthly': round(total_monthly, 2),
        'total_annual': round(total_annual, 2)
    })

@app.route('/api/advisor/chat', methods=['POST'])
def advisor_chat():
    data = request.json or {}
    query = data.get('query', '').lower()
    strategy = data.get('strategy', 'balanced')

    rates = {'conservative': 0.05, 'balanced': 0.08, 'aggressive': 0.12}
    annual_rate = rates.get(strategy, 0.08)

    total_spent = sum(t['amount'] for t in transactions_db)
    total_roundup = sum(t['roundup'] for t in transactions_db)
    
    if 'save' in query or 'cut' in query:
        reply = f"Based on your recent transactions, your top expense category is Food & Dining. By trimming discretionary dining out by 15%, you could save an estimated ${total_spent * 0.05:.2f} monthly while boosting your micro-investments."
    elif 'subscription' in query or 'recurring' in query:
        reply = f"You currently have recurring payments totaling approx ${sum(t['amount'] for t in transactions_db if 'subscription' in t['description'].lower() or 'netflix' in t['description'].lower()):.2f}. Canceling even 1 unused subscription will add over $120 to your annual investment growth."
    elif 'invest' in query or 'growth' in query:
        proj_3yr = total_roundup * ((1 + annual_rate) ** 3)
        reply = f"With a {strategy.capitalize()} strategy ({annual_rate*100:.0f}% annual return), your spare-change micro-investments of ${total_roundup:.2f} are projected to reach ${proj_3yr:.2f} over 3 years."
    else:
        reply = f"Hello! I am your AI Financial Coach. Your total spent over 90 days is ${total_spent:.2f}, and you've automated ${total_roundup:.2f} in spare change savings! Ask me about savings strategies, subscription cleanup, or investment growth."

    timeline = []
    val = total_roundup
    monthly_contrib = total_roundup / 3
    for yr in range(1, 6):
        val = (val + monthly_contrib * 12) * (1 + annual_rate)
        timeline.append({'year': f'Year {yr}', 'amount': round(val, 2)})

    return jsonify({
        'success': True,
        'reply': reply,
        'strategy': strategy,
        'rate_percentage': annual_rate * 100,
        'projections_5yr': timeline
    })

# --- NEW FEATURES: TAX ESTIMATOR & PORTFOLIO ALLOCATOR ---

@app.route('/api/tax', methods=['GET'])
def get_tax_analysis():
    """Calculate tax deductible expenses and estimated tax shield"""
    deductibles = [t for t in transactions_db if t.get('tax_deductible', False)]
    total_deductible = sum(t['amount'] for t in deductibles)
    estimated_tax_shield = total_deductible * 0.25  # 25% tax bracket assumption
    
    return jsonify({
        'success': True,
        'total_deductible': round(total_deductible, 2),
        'estimated_tax_savings': round(estimated_tax_shield, 2),
        'deductible_count': len(deductibles),
        'deductible_transactions': deductibles
    })

@app.route('/api/portfolio/allocator', methods=['GET', 'POST'])
def handle_portfolio_allocator():
    """Get or update micro-investment asset allocation split"""
    global portfolio_allocation_db
    if request.method == 'POST':
        data = request.json
        if data and 'allocation' in data:
            portfolio_allocation_db = data['allocation']
            return jsonify({'success': True, 'message': 'Portfolio allocation updated', 'allocation': portfolio_allocation_db})

    total_roundup = sum(t['roundup'] for t in transactions_db)
    breakdown = []
    for asset, weight in portfolio_allocation_db.items():
        amount = round(total_roundup * (weight / 100.0), 2)
        breakdown.append({
            'asset': asset,
            'weight_percentage': weight,
            'invested_amount': amount
        })

    return jsonify({
        'success': True,
        'total_invested': round(total_roundup, 2),
        'allocation_breakdown': breakdown
    })

@app.route('/api/export', methods=['GET'])
def export_data():
    """Export transaction history to CSV format"""
    output = io.StringIO()
    writer = csv.writer(output)
    
    writer.writerow(['Transaction ID', 'Date', 'Description', 'Category', 'Amount ($)', 'Round-Up ($)', 'Tax Deductible'])
    for t in transactions_db:
        writer.writerow([t['id'], t['date'], t['description'], t['category'], f"{t['amount']:.2f}", f"{t['roundup']:.2f}", t.get('tax_deductible', False)])

    csv_data = output.getvalue()
    return Response(
        csv_data,
        mimetype='text/csv',
        headers={'Content-Disposition': 'attachment; filename=transactions_export.csv'}
    )

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'message': 'Smart Expense API is running with Advanced Tax & Portfolio Allocator Features',
        'version': '2.5.0'
    })

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
