import sys

with open('src/app/login/page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Header text
content = content.replace('text-[36px] font-bold mb-2', 'text-[28px] font-bold mb-1')
content = content.replace('text-[32px] font-bold mb-2', 'text-[28px] font-bold mb-1')
content = content.replace('text-white font-medium text-[15px]', 'text-white/90 font-medium text-[13px]')
content = content.replace('font-extrabold text-[15px] tracking-[0.1em]', 'font-bold text-[14px] tracking-wide')
content = content.replace('text-white text-[15px] font-bold', 'text-white text-[13px] font-semibold')

# Input fields
content = content.replace('rounded-[16px] px-5 py-4', 'rounded-xl px-4 py-3.5 text-sm')
content = content.replace('tracking-[1em] text-[24px]', 'tracking-[0.8em] text-[20px]')

# Forgot password
content = content.replace('text-[#1A1A1A] font-bold text-[14px]', 'text-[#1A1A1A] font-bold text-[13px]')

# Orange Buttons
content = content.replace('text-[16px] py-4 rounded-[28px] shadow-[0_6px_16px_rgba(235,91,39,0.3)]', 'text-[15px] py-3.5 rounded-full shadow-[0_4px_14px_rgba(235,91,39,0.35)]')

# Adjust top padding of the white card slightly
content = content.replace('pt-10 pb-10', 'pt-8 pb-8')
# Adjust card border radius to look slightly softer like the first image
content = content.replace('rounded-t-[36px]', 'rounded-t-[32px]')

with open('src/app/login/page.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
