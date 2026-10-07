import os
import shutil

CHECKPOINT_DIR = os.path.dirname(os.path.abspath(__file__)) + "/checkpoint_2026-10-06_2324"
PROJECT_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

items = ['nft.html', 'portfolio.html', 'index.html', 'css', 'js']

for item in items:
    src = os.path.join(CHECKPOINT_DIR, item)
    dst = os.path.join(PROJECT_ROOT, item)
    if os.path.isfile(src):
        shutil.copy2(src, dst)
        print(f"Restored file: {item}")
    elif os.path.isdir(src):
        shutil.copytree(src, dst, dirs_exist_ok=True)
        print(f"Restored directory: {item}")

print("Successfully restored to checkpoint 23:24 (2026-10-06)!")
