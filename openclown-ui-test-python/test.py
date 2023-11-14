from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException, NoSuchElementException

class CustomWebDriverException(Exception):
    pass

# Set up Chrome options for headless mode
chrome_options = webdriver.ChromeOptions()
# chrome_options.add_argument('--headless')
chrome_options.add_argument('--no-sandbox')  # Required when running as root (e.g., in Docker)
chrome_options.add_argument('--disable-dev-shm-usage')  # Overcome limited resource problems
chrome_options.add_argument('--disable-gpu')

# Set up the WebDriver with Chrome options
driver = webdriver.Remote(
    command_executor='http://192.168.0.181:4444/wd/hub',
    options=chrome_options
)

try:
    # Open the webpage
    driver.get('http://192.168.0.181:5173/')
    # driver.get('https://www.google.com')


except TimeoutException as te:
    raise CustomWebDriverException(f"Timeout occurred: {str(te)}")
except NoSuchElementException as nse:
    raise CustomWebDriverException(f"Element not found: {str(nse)}")
except AssertionError as ae:
    raise CustomWebDriverException(f"Assertion error: {str(ae)}")
except Exception as e:
    raise CustomWebDriverException(f"An unexpected error occurred: {str(e)}")

finally:
    # Close the browser
    driver.quit()