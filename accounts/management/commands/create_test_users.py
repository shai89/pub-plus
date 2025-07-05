import logging
from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from django.db import IntegrityError
from employee_status.models import Status, StatusChoices

User = get_user_model()
logger = logging.getLogger(__name__)

DEFAULT_PASSWORD = "test1234"

USERS = [
    {"username": "john", "email": "john@example.com", "password": DEFAULT_PASSWORD, "status": StatusChoices.WORKING},
    {"username": "sarah", "email": "sarah@example.com", "password": DEFAULT_PASSWORD, "status": StatusChoices.REMOTE},
    {"username": "amir", "email": "amir@example.com", "password": DEFAULT_PASSWORD, "status": StatusChoices.VACATION},
    {"username": "lior", "email": "lior@example.com", "password": DEFAULT_PASSWORD, "status": StatusChoices.BUSINESS_TRIP},
    {"username": "noa", "email": "noa@example.com", "password": DEFAULT_PASSWORD, "status": StatusChoices.WORKING},
]


def delete_test_users():
    logger.info("\n Deleting test users...")
    deleted_count = 0

    for user_data in USERS:
        try:
            user_qs = User.objects.filter(email=user_data["email"])
            for user in user_qs:
                if user.is_superuser:
                    logger.warning(f"🛑 Skipping superuser: {user.username}")
                    continue
                user.delete()
                logger.info(f"Deleted: {user.username} ({user.email})")
                deleted_count += 1
        except Exception as e:
            logger.error(f"❌ Error deleting {user_data['email']}: {e}")

    return deleted_count


def create_test_users():
    logger.info("\n👷 Creating test users...")
    created_count = 0

    for user_data in USERS:
        try:
            user, created = User.objects.get_or_create(username=user_data["username"])
            user.email = user_data["email"]
            user.set_password(user_data["password"])
            user.save()

            if created:
                logger.info(f"✅ Created: {user.username} ({user.email})")
                created_count += 1
            else:
                logger.info(f"⚠️ Already exists: {user.username}")

            # Create status if not exists
            if not hasattr(user, "status"):
                try:
                    Status.objects.create(
                        user=user,
                        value=user_data["status"]
                    )
                    logger.info(f"🟢 Status set for {user.username}: {user_data['status']}")
                except Exception as e:
                    logger.error(f"❌ Failed to set status for {user.username}: {e}")

        except IntegrityError as e:
            logger.error(f"❌ Integrity error: {user_data['email']} - {e}")
        except Exception as e:
            logger.error(f"❌ Error creating {user_data['email']}: {e}")

    return created_count


class Command(BaseCommand):
    help = "Create or reset test users. Use --reset, --create-only or --delete-only."

    def add_arguments(self, parser):
        parser.add_argument('--reset', action='store_true', help='Delete and recreate test users')
        parser.add_argument('--create-only', action='store_true', help='Only create test users')
        parser.add_argument('--delete-only', action='store_true', help='Only delete test users')

    def handle(self, *args, **options):
        if options['reset']:
            logger.info("\n🔄 Resetting test users...")
            delete_test_users()
            created_count = create_test_users()
            self.stdout.write(self.style.SUCCESS(f"\n🎯 Reset complete: {created_count} users created"))
        elif options['create_only']:
            created_count = create_test_users()
            self.stdout.write(self.style.SUCCESS(f"\n📦 Created: {created_count} users"))
        elif options['delete_only']:
            deleted_count = delete_test_users()
            self.stdout.write(self.style.SUCCESS(f"\n🗑️ Deleted: {deleted_count} users"))
        else:
            self.stdout.write(self.style.WARNING(
                "\n⚠️ No action provided. Use one of:\n"
                "  --reset         Delete then create users\n"
                "  --create-only   Create users only\n"
                "  --delete-only   Delete users only"
            ))


