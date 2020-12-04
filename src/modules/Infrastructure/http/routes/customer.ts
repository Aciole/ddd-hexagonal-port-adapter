import { Router } from 'express';

import { NewCustomerController } from '../../../presentation/api/controllers/v1/new-customer/new-customer.controller';
import { DeleteCustomerController } from '../../../presentation/api/controllers/v1/delete-customer/delete-customer.controller';
import { ChangeNameCustomerController } from '../../../presentation/api/controllers/v1/change-name/change-name-customer.controller';
import { ChangePhoneCustomerController } from '../../../presentation/api/controllers/v1/change-phone/change-phone-customer.controller';
import { ChangeEmailCustomerController } from '../../../presentation/api/controllers/v1/change-email/change-email-customer.controller';
import { VerifyEmailCustomerController } from '../../../presentation/api/controllers/v1/verify-email-customer/verify-email-customer.controller';
import { VerifyPhoneCustomerController } from '../../../presentation/api/controllers/v1/verify-phone-customer/verify-phone-customer.controller';

const customerRouter = Router();

customerRouter.post('api/customer/', (req, res) =>
	NewCustomerController.execute(req, res)
);

customerRouter.delete('api/customer/:id', (req, res) =>
	DeleteCustomerController.execute(req, res)
);

customerRouter.patch('api/customer/:id/email', (req, res) =>
	ChangeEmailCustomerController.execute(req, res)
);

customerRouter.patch('api/customer/:id/verify-email', (req, res) =>
	VerifyEmailCustomerController.execute(req, res)
);

customerRouter.patch('api/customer/:id/phone', (req, res) =>
	ChangePhoneCustomerController.execute(req, res)
);

customerRouter.patch('api/customer/:id/verify-phone', (req, res) =>
	VerifyPhoneCustomerController.execute(req, res)
);

customerRouter.patch('api/customer/:id/name', (req, res) =>
	ChangeNameCustomerController.execute(req, res)
);

export { customerRouter };
