# Test script for calculating the amount of efficient hours played based on CML's formula.
# Written by Seamooo (Seagrasspuppy#2357 on Discord)

cum_exp = [0,6517253,13034431]
rates = [250000,330000,925000]
cum_hours = [0.0]
for i in range(1,len(cum_exp)):
    cum_hours.append(cum_hours[i - 1] + (cum_exp[i] - cum_exp[i - 1])/rates[i-1])

print(cum_hours)

def calc_eff_hours(exp):
    val = 2
    for i in range(1,len(cum_exp)):
        if exp < cum_exp[i]:
            val = i - 1
            break
    rv = cum_hours[val] + (exp - cum_exp[val]) / rates[val]
    print(rv)
    return rv

calc_eff_hours(9444552)