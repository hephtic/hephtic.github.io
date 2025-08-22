from manim import *
import numpy as np

class KleinBottleVisualization(ThreeDScene):
    def construct(self):
        # Title
        title = Tex("Constructing the Klein Bottle").to_edge(UP)
        self.add_fixed_in_frame_mobjects(title)
        self.play(Write(title))
        self.wait(1)

        # 1. Start with the fundamental domain (a square)
        self.set_camera_orientation(phi=60 * DEGREES, theta=-45 * DEGREES, zoom=0.8)
        
        square = Square(side_length=4, stroke_color=WHITE).to_edge(LEFT, buff=1.5)
        
        # Arrows for edge identification
        arrow_left = Arrow(square.get_bottom(), square.get_top(), color=BLUE).next_to(square, LEFT, buff=0.2)
        arrow_right = Arrow(square.get_bottom(), square.get_top(), color=BLUE).next_to(square, RIGHT, buff=0.2)
        arrow_bottom = Arrow(square.get_left(), square.get_right(), color=RED).next_to(square, DOWN, buff=0.2)
        arrow_top = Arrow(square.get_right(), square.get_left(), color=RED).next_to(square, UP, buff=0.2) # Note the reversal
        
        arrows = VGroup(arrow_left, arrow_right, arrow_bottom, arrow_top)
        
        self.play(Create(square), Create(arrows))
        self.wait(2)

        # 2. Form the cylinder
        self.play(FadeOut(arrows))
        
        cylinder = Cylinder(radius=4 / (2 * PI), height=4, direction=OUT, fill_opacity=0.5, fill_color=BLUE_D)
        
        self.play(
            Transform(square, cylinder),
            run_time=3
        )
        self.move_camera(phi=75 * DEGREES, theta=30 * DEGREES, zoom=1, run_time=2)
        self.wait(1)

        # 3. Animate the self-intersection
        # Define the Klein bottle parametrically (oriented upright)
        def klein_bottle_func(u, v):
            u, v = u * 2 * PI, v * 2 * PI
            r = 4 * (1 - np.cos(u) / 2)
            x, y, z = 0, 0, 0
            if 0 <= u < PI:
                x_temp = 6 * np.cos(u) * (1 + np.sin(u)) + r * np.cos(u) * np.cos(v)
                z_temp = 16 * np.sin(u) + r * np.sin(u) * np.cos(v)
            else:
                x_temp = 6 * np.cos(u) * (1 + np.sin(u)) - r * np.cos(v)
                z_temp = 16 * np.sin(u)
            y_temp = r * np.sin(v)
            # Return rotated coordinates to make it stand up
            return np.array([x_temp, y_temp, z_temp]) * 0.1
            
        klein_bottle = Surface(
            klein_bottle_func,
            u_range=[0, 1],
            v_range=[0, 1],
            resolution=(100, 32),
            fill_opacity=0.7,
            fill_color=GREEN_D
        )
                
        # --- CAMERA FIX ---
        # Move camera to a side-on view to see the intersection happen
        self.move_camera(phi=80 * DEGREES, theta=-90 * DEGREES, zoom=1.0, run_time=3)

        # The square will transform into the klein_bottle at the origin
        self.play(
            Transform(square, klein_bottle),
            run_time=4
        )

        # 4. Show non-orientability with a moving object
        # Adjust camera for a good view of the path
        self.move_camera(phi=70 * DEGREES, theta=45 * DEGREES, zoom=1.2, run_time=2)

        # Animate a small frame moving along a path
        path_func = lambda t: klein_bottle_func(t, 0.5)
        path = ParametricFunction(path_func, t_range=[0, 1], color=YELLOW)
        
        # FIX 2: Use a simple dot that changes color to show orientation flip
        dot = Sphere(radius=0.1, color=RED, fill_opacity=0.8)

        def dot_updater(mob, dt):
            t = mob.alpha
            current_point = path.point_from_proportion(t)
            mob.move_to(current_point)
            
            # Change color based on orientation - this will flip halfway through
            # demonstrating the non-orientable property
            if t < 0.5:
                mob.set_color(RED)
            else:
                mob.set_color(BLUE)

        dot.alpha = 0
        dot.add_updater(dot_updater)
        
        self.play(Create(path), FadeIn(dot))

        self.play(
            UpdateFromAlphaFunc(dot, lambda mob, alpha: setattr(mob, 'alpha', alpha)),
            run_time=10,
            rate_func=linear
        )
        
        dot.remove_updater(dot_updater)
        self.wait(2)