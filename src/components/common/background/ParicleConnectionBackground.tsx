'use client';
import { addAlphaHex, hslToHex } from '@/lib/colors';
import React, { FC, memo, useEffect, useRef } from 'react';

export const ParicleConnectionBackground: FC = memo(() => {
	const canvasRef = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		let bodyStyles = window.getComputedStyle(document.body);
		let bgColor = hslToHex(bodyStyles.getPropertyValue('--background'));
		var primaryColor = hslToHex(bodyStyles.getPropertyValue('--primary'));

		let canvas = canvasRef.current!,
			ctx = canvas.getContext('2d')!,
			w = (canvas.width = innerWidth),
			h = (canvas.height = innerHeight),
			particles: Particle[] = [],
			properties = {
				bgColor: bgColor,
				particleColor: primaryColor,
				particleRadius: 3,
				particleCount: 60,
				particleMaxVelocity: 0.5,
				lineLength: 150,
				particleLife: 6,
			};

		canvas.style.zIndex = '-100';
		document.querySelector('body')!.appendChild(canvas);

		window.onresize = function () {
			(w = canvas.width = innerWidth), (h = canvas.height = innerHeight);
		};

		let observer = new MutationObserver(function (mutations) {
			mutations.forEach(function (mutation) {
				if (mutation.type === 'attributes') {
					properties = {
						bgColor: hslToHex(bodyStyles.getPropertyValue('--background')),
						particleColor: hslToHex(bodyStyles.getPropertyValue('--primary')),
						particleRadius: 3,
						particleCount: 60,
						particleMaxVelocity: 0.5,
						lineLength: 150,
						particleLife: 6,
					};
				}
			});
		});
		observer.observe(document.body, {
			attributes: true, //configure it to listen to attribute changes
		});

		class Particle {
			public x!: number;
			public y!: number;
			public velocityX!: number;
			public velocityY!: number;
			public life!: number;

			constructor() {
				this.x = Math.random() * w;
				this.y = Math.random() * h;
				this.velocityX =
					Math.random() * (properties.particleMaxVelocity * 2) -
					properties.particleMaxVelocity;
				this.velocityY =
					Math.random() * (properties.particleMaxVelocity * 2) -
					properties.particleMaxVelocity;
				this.life = Math.random() * properties.particleLife * 60;
			}
			position() {
				(this.x + this.velocityX > w && this.velocityX > 0) ||
				(this.x + this.velocityX < 0 && this.velocityX < 0)
					? (this.velocityX *= -1)
					: this.velocityX;
				(this.y + this.velocityY > h && this.velocityY > 0) ||
				(this.y + this.velocityY < 0 && this.velocityY < 0)
					? (this.velocityY *= -1)
					: this.velocityY;
				this.x += this.velocityX;
				this.y += this.velocityY;
			}
			reDraw() {
				ctx.beginPath();
				ctx.arc(this.x, this.y, properties.particleRadius, 0, Math.PI * 2);
				ctx.closePath();
				ctx.fillStyle = properties.particleColor;
				ctx.fill();
			}
			reCalculateLife() {
				if (this.life < 1) {
					this.x = Math.random() * w;
					this.y = Math.random() * h;
					this.velocityX =
						Math.random() * (properties.particleMaxVelocity * 2) -
						properties.particleMaxVelocity;
					this.velocityY =
						Math.random() * (properties.particleMaxVelocity * 2) -
						properties.particleMaxVelocity;
					this.life = Math.random() * properties.particleLife * 60;
				}
				this.life--;
			}
		}

		function reDrawBackground() {
			ctx.fillStyle = properties.bgColor;
			ctx.fillRect(0, 0, w, h);
		}

		function drawLines() {
			let x1, y1, x2, y2, length, opacity;
			for (let i in particles) {
				for (let j in particles) {
					x1 = particles[i].x;
					y1 = particles[i].y;
					x2 = particles[j].x;
					y2 = particles[j].y;
					length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
					if (length < properties.lineLength) {
						opacity = 1 - length / properties.lineLength;
						ctx.lineWidth = 0.5;
						ctx.strokeStyle = addAlphaHex(properties.particleColor, opacity);
						ctx.beginPath();
						ctx.moveTo(x1, y1);
						ctx.lineTo(x2, y2);
						ctx.closePath();
						ctx.stroke();
					}
				}
			}
		}

		function reDrawParticles() {
			for (let i in particles) {
				particles[i].reCalculateLife();
				particles[i].position();
				particles[i].reDraw();
			}
		}

		function loop() {
			reDrawBackground();
			reDrawParticles();
			drawLines();
			requestAnimationFrame(loop);
		}

		function init() {
			for (let i = 0; i < properties.particleCount; i++) {
				particles.push(new Particle());
			}
			loop();
		}

		init();
	}, [canvasRef]);
	return (
		<canvas
			className='fixed top-0 z-[-100] opacity-20 left-0 w-full h-full'
			ref={canvasRef}
		></canvas>
	);
});
