"""
Author: Ajay Wankhade
Version: 1.0
Description: This file contains logger configuration for debugging purpose.
"""
import logging
import os

log_dir = os.path.abspath("logs")
os.makedirs(log_dir, exist_ok=True)

def setup_logging():
    logging.basicConfig(
        level=logging.DEBUG,
        format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
        handlers=[
            logging.FileHandler(os.path.join(log_dir, "app.log")),
            logging.StreamHandler()
        ]
    )
