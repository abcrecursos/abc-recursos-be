import { Controller, Get, Post, UseGuards, Request, Body } from '@nestjs/common';
import { LocalAuthGuard } from './guards/local.guard';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

  constructor(private authService: AuthService) {}

	@UseGuards(LocalAuthGuard)
	@Post("/login")
	login(@Request() req, @Body() data: LoginDto) {
		return this.authService.login(req.user);
	}
}
